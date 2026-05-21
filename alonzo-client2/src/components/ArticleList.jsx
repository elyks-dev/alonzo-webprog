import { Link } from "react-router-dom";
import Button from "./Button";
import constants from "../constants";

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;

  const baseURL = constants.HOST.replace("/api", "");
  return `${baseURL}${image}`;
};

const getAuthorName = (author) => {
  if (!author) return "Unknown";

  return (
    author.username ||
    `${author.firstName || ""} ${author.lastName || ""}`.trim() ||
    "Unknown"
  );
};

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {articles.map((article, index) => {
        const mainImage =
          article.images && article.images.length > 0
            ? article.images[0]
            : article.image;

        const authorName = getAuthorName(article.author);

        return (
          <article
            key={article._id || article.name}
            className="group overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-[#1a1a1d] p-4 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#202026]"
          >
            <div className="overflow-hidden rounded-[1.25rem] bg-zinc-900">
              {mainImage ? (
                <img
                  src={getImageUrl(mainImage)}
                  alt={article.title}
                  className="h-56 w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              ) : (
                <div className="flex h-56 w-full items-center justify-center bg-[#111113] text-sm text-zinc-500">
                  No image available
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
                Article {String(index + 1).padStart(2, "0")}
              </p>

              <p className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] font-semibold text-zinc-400">
                @{authorName}
              </p>
            </div>

            <h3 className="mt-3 text-xl font-bold leading-snug text-zinc-100">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {article.content?.[0]?.substring(0, 150) ||
                "No preview available."}
              ...
            </p>

            <Link to={`/articles/${article.name}`}>
              <Button className="mt-5">Read More</Button>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleList;