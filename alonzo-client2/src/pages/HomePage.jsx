import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fetchArticles } from "../services/ArticleService";
import {
  fetchPosts,
  createPost,
  createReply,
  deletePost,
  deleteReply,
} from "../services/PostService";
import constants from "../constants";

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;

  const baseURL = constants.HOST.replace("/api", "");
  return `${baseURL}${image}`;
};

const shuffleArticles = (articles) => {
  return [...articles].sort(() => Math.random() - 0.5).slice(0, 4);
};

const getAuthorName = (author) => {
  if (!author) return "unknown";

  return (
    author.username ||
    `${author.firstName || ""} ${author.lastName || ""}`.trim() ||
    "unknown"
  );
};

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

const getLoggedInUserId = () => {
  const user = getUserFromToken();
  return user?.id || user?.userId || null;
};

const formatTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const HomePage = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postError, setPostError] = useState("");

  const [activeReplyPostId, setActiveReplyPostId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyError, setReplyError] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const token = localStorage.getItem("token");
  const loggedInUserId = getLoggedInUserId();

  const loadArticles = async () => {
    try {
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  const loadPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    loadArticles();
    loadPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300;

      if (nearBottom) {
        setVisiblePosts((prev) => Math.min(prev + 5, posts.length));
      }

      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts.length]);

  const featuredArticles = useMemo(() => {
    return shuffleArticles(articles);
  }, [articles]);

  const currentArticle = featuredArticles[currentIndex];
  const displayedPosts = posts.slice(0, visiblePosts);

  const goPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === featuredArticles.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenPost = () => {
    if (!token) {
      navigate("/signin");
      return;
    }

    setPostError("");
    setPostModalOpen(true);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setPostError("");

    if (!postContent.trim()) {
      setPostError("Post cannot be empty.");
      return;
    }

    try {
      await createPost({ content: postContent });
      setPostContent("");
      setPostModalOpen(false);
      setVisiblePosts(5);
      await loadPosts();
    } catch (error) {
      setPostError(
        error.response?.data?.message || "Failed to post. Please try again."
      );
    }
  };

  const handleOpenReply = (postId) => {
    if (!token) {
      navigate("/signin");
      return;
    }

    setReplyError("");
    setReplyContent("");
    setActiveReplyPostId(activeReplyPostId === postId ? null : postId);
  };

  const handleSubmitReply = async (postId) => {
    setReplyError("");

    if (!replyContent.trim()) {
      setReplyError("Reply cannot be empty.");
      return;
    }

    try {
      await createReply(postId, { content: replyContent });
      setReplyContent("");
      setActiveReplyPostId(null);
      await loadPosts();
    } catch (error) {
      setReplyError(
        error.response?.data?.message || "Failed to reply. Please try again."
      );
    }
  };

  const openDeletePostModal = (postId) => {
    setDeleteError("");
    setDeleteTarget({
      type: "post",
      postId,
      title: "Delete Post",
      message: "Delete this post? All replies under it will also be deleted.",
    });
    setDeleteModalOpen(true);
  };

  const openDeleteReplyModal = (postId, replyId) => {
    setDeleteError("");
    setDeleteTarget({
      type: "reply",
      postId,
      replyId,
      title: "Delete Reply",
      message: "Delete this reply?",
    });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "post") {
        await deletePost(deleteTarget.postId);
      }

      if (deleteTarget.type === "reply") {
        await deleteReply(deleteTarget.postId, deleteTarget.replyId);
      }

      setDeleteModalOpen(false);
      setDeleteTarget(null);
      setDeleteError("");
      await loadPosts();
    } catch (error) {
      setDeleteError(
        error.response?.data?.message || "Failed to delete. Please try again."
      );
    }
  };

  const renderArticleCard = (article) => (
    <article className="group mx-auto flex h-[460px] max-w-[460px] flex-col overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-[#1a1a1d] p-4 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#202026]">
      <div className="overflow-hidden rounded-[1.25rem]">
        <img
          src={getImageUrl(
            article.images && article.images.length > 0
              ? article.images[0]
              : article.image
          )}
          alt={article.title}
          className="h-48 w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="inline-flex w-fit rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-violet-300">
          Latest Article
        </span>

        <h2 className="mt-4 line-clamp-2 min-h-[52px] text-base font-bold leading-snug text-zinc-100">
          {article.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-zinc-400">
          {article.content?.[0] || "No preview available."}
        </p>

        <p className="mt-4 text-sm text-zinc-500">
          by @{getAuthorName(article.author)}
        </p>

        <div className="mt-auto pt-5">
          <Link to={`/articles/${article.name}`}>
            <Button variant="primary">Read More</Button>
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <div className="flex w-full flex-col bg-[#111113] text-zinc-100">
      <section className="relative overflow-hidden bg-[#151517] px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="hidden lg:block">
            <span className="mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-6 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
              Latest Articles
            </span>

            <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] text-zinc-50 sm:text-5xl lg:text-5xl">
              Fresh reads from
              <span className="block bg-gradient-to-r from-violet-300 to-zinc-100 bg-clip-text text-transparent">
                the tech community.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
              Discover articles about programming, development, PC hardware,
              software tools, AI, and digital culture written by people in the
              community.
            </p>

            <div className="mt-8">
              <Button to="/articles" variant="primary">
                View All Articles
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300 lg:hidden">
              Latest Articles
            </p>

            {featuredArticles.length > 0 && (
              <>
                <div className="lg:hidden">
                  {currentArticle && renderArticleCard(currentArticle)}

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={goPrevious}
                      className="rounded-full border border-zinc-700 bg-[#18181b] px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-400/10"
                    >
                      Previous
                    </button>

                    <span className="text-sm font-medium text-zinc-500">
                      {currentIndex + 1} / {featuredArticles.length}
                    </span>

                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-full border border-zinc-700 bg-[#18181b] px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-400/10"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block">
                  {currentArticle && renderArticleCard(currentArticle)}

                  <div className="mt-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goPrevious}
                      className="rounded-full border border-zinc-700 bg-[#18181b] px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-400/10"
                    >
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {featuredArticles.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            currentIndex === index
                              ? "bg-violet-300"
                              : "bg-zinc-700"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-full border border-zinc-700 bg-[#18181b] px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-400/10"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section
        id="community-feed"
        className="border-y border-zinc-800 bg-[#111113] px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
                Community Feed
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-100">
                Discussions
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-zinc-500">
              Share quick thoughts, questions, updates, or anything related to
              tech and development.
            </p>
          </div>

          <div className="grid gap-4">
            {posts.length > 0 ? (
              displayedPosts.map((post) => {
                const isPostOwner =
                  loggedInUserId && post.author?._id === loggedInUserId;

                return (
                  <article
                    key={post._id}
                    className="rounded-[1.75rem] border border-zinc-800 bg-[#18181b] p-5 shadow-lg shadow-black/10"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-zinc-100">
                          @{getAuthorName(post.author)}
                        </p>

                        <p className="mt-1 text-xs font-medium text-zinc-500">
                          {formatTime(post.createdAt)}
                        </p>
                      </div>

                      {isPostOwner && (
                        <button
                          type="button"
                          onClick={() => openDeletePostModal(post._id)}
                          className="rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                      {post.content}
                    </p>

                    <div className="mt-5 flex items-center gap-3 border-t border-zinc-800 pt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenReply(post._id)}
                        className="rounded-full border border-zinc-700 px-4 py-1.5 text-xs font-bold text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white"
                      >
                        Reply
                      </button>

                      <span className="text-xs text-zinc-500">
                        {post.replies?.length || 0} replies
                      </span>
                    </div>

                    {activeReplyPostId === post._id && (
                      <div className="mt-4 rounded-2xl border border-zinc-800 bg-[#111113] p-4">
                        {replyError && (
                          <p className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                            {replyError}
                          </p>
                        )}

                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="min-h-24 w-full resize-none rounded-xl border border-zinc-700 bg-[#18181b] px-4 py-3 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-violet-400/60"
                        />

                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveReplyPostId(null);
                              setReplyContent("");
                              setReplyError("");
                            }}
                            className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSubmitReply(post._id)}
                            className="rounded-full bg-violet-500 px-4 py-2 text-xs font-bold text-white hover:bg-violet-600"
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    )}

                    {post.replies && post.replies.length > 0 && (
                      <div className="mt-4 space-y-3 border-l border-zinc-800 pl-4">
                        {post.replies.map((reply) => {
                          const isReplyOwner =
                            loggedInUserId &&
                            reply.author?._id === loggedInUserId;

                          return (
                            <div
                              key={reply._id}
                              className="rounded-2xl bg-[#111113] p-4"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <p className="text-xs font-bold text-zinc-200">
                                    @{getAuthorName(reply.author)}
                                  </p>

                                  <p className="mt-1 text-[11px] text-zinc-500">
                                    {formatTime(reply.createdAt)}
                                  </p>
                                </div>

                                {isReplyOwner && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openDeleteReplyModal(
                                        post._id,
                                        reply._id
                                      )
                                    }
                                    className="rounded-full border border-red-500/30 px-3 py-1 text-[11px] font-bold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>

                              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-400">
                                {reply.content}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="rounded-[1.75rem] border border-zinc-800 bg-[#18181b] p-6 text-sm text-zinc-500">
                No discussions yet. Be the first to post.
              </div>
            )}

            {visiblePosts < posts.length && (
              <p className="py-4 text-center text-sm text-zinc-500">
                Loading more discussions...
              </p>
            )}
          </div>
        </div>
      </section>

      {showBackToTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-24 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-[#18181b] text-xl text-zinc-200 shadow-2xl shadow-black/30 transition hover:border-violet-400/50 hover:bg-violet-400/10"
        >
          ↑
        </button>
      )}

      <button
        type="button"
        onClick={handleOpenPost}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500 text-3xl font-light text-white shadow-2xl shadow-violet-950/40 transition hover:scale-105 hover:bg-violet-600"
      >
        +
      </button>

      {postModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-zinc-800 bg-[#18181b] p-6 shadow-2xl shadow-black/50">
            <h3 className="text-2xl font-black text-zinc-100">
              Create Discussion
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Post a quick update or discussion for the community feed.
            </p>

            {postError && (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {postError}
              </p>
            )}

            <form onSubmit={handleSubmitPost} className="mt-5">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="min-h-36 w-full resize-none rounded-2xl border border-zinc-700 bg-[#111113] px-4 py-3 text-sm leading-7 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-violet-400/60"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPostModalOpen(false);
                    setPostContent("");
                    setPostError("");
                  }}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-violet-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-violet-600"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-zinc-800 bg-[#18181b] p-6 shadow-2xl shadow-black/50">
            <h3 className="text-2xl font-black text-zinc-100">
              {deleteTarget?.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {deleteTarget?.message}
            </p>

            {deleteError && (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteTarget(null);
                  setDeleteError("");
                }}
                className="rounded-full px-5 py-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;