import Button from '../components/Button';
import authorImg from '../assets/me.jpg';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl border-2 border-zinc-200 shadow-xl">
            <img
              src={authorImg}
              alt="Author"
              className="h-96 w-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
              About the Author
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              Hi, I'm Kyle.<br />
              <span className="text-violet-500">I write about things that matter.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-500">
              I'm a writer, designer, and developer based online. I started this blog to
              share ideas on creativity, technology, and the art of making things on the web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles" variant="secondary">Read Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Quick facts
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">By the numbers</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { number: '05', label: 'Years Writing' },
              { number: '120', label: 'Articles' },
              { number: '24K', label: 'Readers' },
              { number: '08', label: 'Topics Covered' },
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
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">My Story</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">How it all started</h2>
            <div className="mt-6 space-y-4">
              {[
                { title: 'The Beginning', body: 'I started writing as a hobby in 2019 — just short essays on design and the web. What began as a personal journal slowly grew into something bigger.' },
                { title: 'Finding My Voice', body: 'Over time I discovered what I loved writing about most: the intersection of creativity and technology, and how they shape the way we live and work.' },
                { title: 'Today', body: 'Now I publish weekly articles read by thousands of curious people. The goal is simple — write clearly, think deeply, and share ideas worth your time.' },
              ].map((block) => (
                <article key={block.title} className="rounded-3xl border-2 border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="text-base font-bold text-zinc-900">{block.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{block.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">Topics I Cover</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">What you'll find here</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop', label: 'Design' },
                { img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop', label: 'Technology' },
                { img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop', label: 'Writing' },
                { img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&auto=format&fit=crop', label: 'Productivity' },
              ].map((topic) => (
                <div key={topic.label} className="group relative overflow-hidden rounded-2xl border-2 border-zinc-200">
                  <img src={topic.img} alt={topic.label} className="h-32 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-zinc-900/70 to-transparent p-3">
                    <span className="text-sm font-bold text-white">{topic.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button to="/articles" variant="primary" className="mt-6">Explore Articles</Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;