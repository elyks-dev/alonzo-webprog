import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { fetchArticles } from "../services/ArticleService";
import constants from "../constants";

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;

  const baseURL = constants.HOST.replace("/api", "");
  return `${baseURL}${image}`;
};

const getAuthorName = (author) => {
  if (!author) return "Unknown Author";

  return (
    author.username ||
    `${author.firstName || ""} ${author.lastName || ""}`.trim() ||
    "Unknown Author"
  );
};

function ArticlePage() {
  const { name } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const loadArticle = async () => {
    try {
      const { data } = await fetchArticles();

      const foundArticle = data.articles.find((item) => item.name === name);

      setArticle(foundArticle || null);
    } catch (error) {
      console.error("Failed to fetch article:", error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
    setCurrentImageIndex(0);
  }, [name]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111113] px-4 text-zinc-100">
        <div className="rounded-[1.75rem] border border-zinc-800 bg-[#18181b] px-8 py-6 shadow-xl shadow-black/20">
          <h1 className="text-2xl font-bold">Loading article...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111113] px-4">
        <div className="rounded-[1.75rem] border border-zinc-800 bg-[#18181b] p-8 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-bold text-zinc-100">
            Article not found
          </h1>

          <Button to="/articles" className="mt-6">
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const authorName = getAuthorName(article.author);

  const articleImages =
    article.images && article.images.length > 0
      ? article.images
      : article.image
      ? [article.image]
      : [];

  const hasMultipleImages = articleImages.length > 1;

  const goPreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? articleImages.length - 1 : prev - 1
    );
  };

  const goNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === articleImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="flex w-full flex-col bg-[#111113] text-zinc-100">
      <section className="relative overflow-hidden bg-[#151517] px-4 pt-20 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8">
            <Button to="/articles">← Back to Articles</Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
            Article
          </p>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-zinc-50 sm:text-6xl">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-200">
              Posted by @{authorName}
            </span>

            <span className="text-sm text-zinc-500">
              {article.name
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-[#111113] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {articleImages.length > 0 && (
            <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#18181b] p-3 shadow-2xl shadow-black/20">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={getImageUrl(articleImages[currentImageIndex])}
                  alt={`${article.title} ${currentImageIndex + 1}`}
                  className="aspect-video w-full object-cover opacity-90 transition duration-500"
                />

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={goPreviousImage}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-[#111113]/80 text-xl text-zinc-100 backdrop-blur transition hover:border-violet-400/50 hover:bg-violet-400/20"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={goNextImage}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-[#111113]/80 text-xl text-zinc-100 backdrop-blur transition hover:border-violet-400/50 hover:bg-violet-400/20"
                    >
                      ›
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-zinc-700 bg-[#111113]/80 px-4 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur">
                      {currentImageIndex + 1} / {articleImages.length}
                    </div>
                  </>
                )}
              </div>

              {hasMultipleImages && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {articleImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                        currentImageIndex === index
                          ? "border-violet-400"
                          : "border-zinc-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${article.title} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-10 rounded-[2rem] border border-zinc-800 bg-[#18181b] p-8 shadow-xl shadow-black/10">
            <div className="mb-8 rounded-2xl border border-zinc-800 bg-[#111113] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300">
                Written by
              </p>

              <p className="mt-1 text-sm font-bold text-zinc-100">
                @{authorName}
              </p>
            </div>

            <div className="space-y-6">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="whitespace-pre-wrap text-base leading-8 text-zinc-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-zinc-800 pt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;