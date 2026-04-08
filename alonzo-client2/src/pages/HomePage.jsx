import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
              Welcome to the Blog
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              Ideas worth reading,<br />
              <span className="text-violet-500">stories worth sharing.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-500">
              A modern blog exploring design, technology, and creative thinking.
              Fresh articles every week — written for curious minds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/articles" variant="primary">Browse Articles</Button>
              <Button to="/about" variant="secondary">About the Author</Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border-2 border-zinc-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop"
              alt="Blog hero"
              className="h-80 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            By the numbers
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Growing every week
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '120+', label: 'Articles Published' },
              { number: '08', label: 'Categories' },
              { number: '24K', label: 'Monthly Readers' },
              { number: '04', label: 'Years Running' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border-2 border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-bold text-zinc-900">{stat.number}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                Featured
              </p>
              <h2 className="mt-1 text-2xl font-bold text-zinc-900">Latest posts</h2>
            </div>
            <Button to="/articles" variant="secondary">View All</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop',
                tag: 'Design',
                title: 'Why whitespace is your best design tool',
                excerpt: 'Less is more — how intentional spacing transforms layouts from cluttered to clean.',
              },
              {
                img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop',
                tag: 'Technology',
                title: 'Getting started with modern web development',
                excerpt: 'A beginner-friendly guide to React, Vite, and Tailwind CSS in 2024.',
              },
              {
                img: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&auto=format&fit=crop',
                tag: 'Creativity',
                title: 'How to build a writing habit that sticks',
                excerpt: 'Practical tips for showing up consistently and publishing content you are proud of.',
              },
            ].map((post) => (
              <article key={post.title} className="group overflow-hidden rounded-3xl border-2 border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:shadow-md">
                <div className="overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block rounded-full bg-violet-100 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-600">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 text-base font-bold leading-snug text-zinc-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{post.excerpt}</p>
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

export default HomePage;