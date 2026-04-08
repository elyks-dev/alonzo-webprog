import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          {articles.length} Web Development Articles
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Browse topics like React, Tailwind CSS, JavaScript ES6, Node.js, and Git.
          Each article includes examples and explanations to help you improve your coding skills.
        </p>

        <div className="mt-6 flex gap-4">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Latest Development Guides
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
}

export default ArticleListPage;