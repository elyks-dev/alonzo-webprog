import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="text-center">
        <p className="text-[80px] font-bold leading-none text-zinc-900">404</p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Page Not Found
        </p>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl">
          Oops! This page doesn't exist.
        </h1>
        <p className="mt-3 max-w-md mx-auto text-sm leading-7 text-zinc-600">
          The link you followed may be broken, or the page may have been removed.
          Let's get you back on track.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button to="/">Back to Home</Button>
          <Button to="/articles">Browse Articles</Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;