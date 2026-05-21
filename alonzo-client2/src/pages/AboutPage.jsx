import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { fetchArticles } from "../services/ArticleService";
import { fetchPosts } from "../services/PostService";

const AboutPage = () => {
  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);

  const loadStats = async () => {
    try {
      const [articlesResponse, postsResponse] = await Promise.all([
        fetchArticles(),
        fetchPosts(),
      ]);

      setArticles(articlesResponse.data.articles || []);
      setPosts(postsResponse.data.posts || []);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const totalReplies = useMemo(() => {
    return posts.reduce((total, post) => total + (post.replies?.length || 0), 0);
  }, [posts]);

  const totalContributors = useMemo(() => {
    const contributors = new Set();

    articles.forEach((article) => {
      if (article.author?._id) contributors.add(article.author._id);
    });

    posts.forEach((post) => {
      if (post.author?._id) contributors.add(post.author._id);

      post.replies?.forEach((reply) => {
        if (reply.author?._id) contributors.add(reply.author._id);
      });
    });

    return contributors.size;
  }, [articles, posts]);

  const stats = [
    { number: articles.length, label: "Articles Published" },
    { number: posts.length, label: "Discussions Posted" },
    { number: totalReplies, label: "Replies Shared" },
    { number: totalContributors, label: "Community Contributors" },
  ];

  return (
    <div className="flex w-full flex-col bg-[#111113] text-zinc-100">
      <section className="relative overflow-hidden bg-[#151517] px-4 pt-20 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
            Tech Articles & Community
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-zinc-50 sm:text-4xl lg:text-5xl">
            Share ideas, read articles,
            <span className="block bg-gradient-to-r from-violet-300 to-zinc-100 bg-clip-text text-transparent">
              and join tech discussions.
            </span>
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-8 text-zinc-400">
            Explore articles from different users, discover topics in programming,
            web development, AI, hardware, and software, and join community
            discussions through posts and replies.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/articles" variant="primary">
              Browse Articles
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-[#111113] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
            By the numbers
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100">
            Platform activity
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-zinc-800 bg-[#18181b] p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#1d1d22]"
              >
                <p className="text-3xl font-black text-zinc-50">
                  {stat.number}
                </p>

                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-[#151517] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
            Purpose
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100">
            Why this site exists
          </h2>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "For Learning",
                body: "The platform helps users share articles and discussions about coding, web tools, hardware, AI, and other technology topics.",
              },
              {
                title: "For Tech Updates",
                body: "Users can publish articles, read insights from others, and stay connected with topics related to development and digital trends.",
              },
              {
                title: "For Community",
                body: "The discussion feed allows users to post thoughts, ask questions, reply to others, and interact with people who share the same interest in tech.",
              },
            ].map((block) => (
              <article
                key={block.title}
                className="rounded-[1.75rem] border border-zinc-800 bg-[#1a1a1d] p-5 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#202026]"
              >
                <h3 className="text-base font-bold text-zinc-100">
                  {block.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {block.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;