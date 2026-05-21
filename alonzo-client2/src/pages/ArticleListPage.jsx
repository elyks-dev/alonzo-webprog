import { useEffect, useState } from "react";
import Button from "../components/Button";
import ArticleList from "../components/ArticleList";
import { fetchArticles } from "../services/ArticleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  const loadArticles = async () => {
    try {
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col bg-[#111113] text-zinc-100">
      <section className="relative overflow-hidden bg-[#151517] px-4 pt-20 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <span className="mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-6 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
            Articles
          </span>

          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-[-0.04em] text-zinc-50 sm:text-4xl lg:text-5xl">
            Read stories and insights
            <span className="block bg-gradient-to-r from-violet-300 to-zinc-100 bg-clip-text text-transparent">
            from the tech community.
            </span>
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-8 text-zinc-400">
              Browse user-published articles about programming, web development,
              PC hardware, AI, software tools, and digital culture
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-[#111113] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
                Featured Articles
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100">
                Latest posts and insights
              </h2>
            </div>

            <div className="rounded-full border border-zinc-800 bg-[#18181b] px-5 py-2 text-sm font-medium text-zinc-400 shadow-lg shadow-black/10">
              {articles.length} Articles Available
            </div>
          </div>

          <ArticleList articles={articles} />
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;