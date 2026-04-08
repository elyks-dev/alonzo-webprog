const Footer = () => {
  return (
    <footer className="bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-6">
        
        <div className="flex flex-col items-center gap-1">
          <span className="text-xl font-bold text-white tracking-tight">Alonzo Creatives</span>
          <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Web Development Blog</span>
        </div>

        <div className="w-12 h-px bg-zinc-700" />

        <p className="text-xs text-zinc-500">
          © 2026 Alonzo Creatives. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;