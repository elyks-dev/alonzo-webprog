import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#111113] px-4 py-16 text-zinc-100">
      <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-[-30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-3xl" />  

      <div className="relative w-full max-w-2xl rounded-[2rem] border border-zinc-800 bg-[#18181b]/95 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <p className="bg-gradient-to-r from-violet-300 to-zinc-100 bg-clip-text text-[90px] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[120px]">
          404
        </p>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
          Page Not Found
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-zinc-50 sm:text-4xl">
          Oops, this page does not exist.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
          The link may be broken, removed, or typed incorrectly. You can go back
          home or continue browsing the latest articles.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Back to Home
          </Button>

          <Button to="/articles" variant="secondary">
            Browse Articles
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;