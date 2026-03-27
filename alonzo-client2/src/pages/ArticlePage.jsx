import Button from '../components/Button';

const articles = [
  {
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop',
    tag: 'Design',
    number: '01',
    title: 'Why whitespace is your best design tool',
    excerpt: 'Less is more — how intentional spacing transforms layouts from cluttered to clean.',
  },
  {
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop',
    tag: 'Technology',
    number: '02',
    title: 'Getting started with modern web development',
    excerpt: 'A beginner-friendly guide to React, Vite, and Tailwind CSS in 2024.',
  },
  {
    img: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&auto=format&fit=crop',
    tag: 'Creativity',
    number: '03',
    title: 'How to build a writing habit that sticks',
    excerpt: 'Practical tips for showing up consistently and publishing content you are proud of.',
  },
  {
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&auto=format&fit=crop',
    tag: 'Productivity',
    number: '04',
    title: 'The power of a weekly review',
    excerpt: 'A simple reflection habit that keeps your goals on track and your mind clear.',
  },
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop',
    tag: 'Writing',
    number: '05',
    title: 'How to write an intro that hooks readers',
    excerpt: 'The first three sentences decide whether someone reads on — here is how to nail them.',
  },
  {
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop',
    tag: 'Design',
    number: '06',
    title: 'Color theory for non-designers',
    excerpt: 'A practical breakdown of how to pick colors that work together every time.',
  },
  {
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
    tag: 'Technology',
    number: '07',
    title: 'What I learned building my first SaaS',
    excerpt: 'Honest lessons from shipping a product solo — what worked, what failed, and what I would do differently.',
  },
  {
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop',
    tag: 'Writing',
    number: '08',
    title: 'Why editing is more important than writing',
    excerpt: 'The real work happens after the first draft — how ruthless editing makes your writing shine.',
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero */}
      <section className="border-y-2 border-zinc-900 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
            All Articles
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
            Everything we've written.<br />
            <span className="text-violet-500">Find your next read.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-500">
            Browse our full collection of articles on design, technology, writing,
            and creativity. New posts every week.
          </p>
          <Button to="/" variant="secondary" className="mt-6">Back Home</Button>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              All Posts
            </p>
            <h2 className="mt-1 text-2xl font-bold text-zinc-900">
              {articles.length} articles and counting
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <article
                key={article.number}
                className="group overflow-hidden rounded-3xl border-2 border-zinc-200 bg-white transition hover:border-zinc-400 hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-violet-100 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-600">
                      {article.tag}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-300">#{article.number}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-zinc-900">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{article.excerpt}</p>
                  <Button className="mt-4" variant="primary">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;