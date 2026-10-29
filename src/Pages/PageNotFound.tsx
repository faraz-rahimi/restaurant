import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#171311] px-4 py-16 text-[#f8f4ef]">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="M9 9a3 3 0 0 1 5.5 1.6c0 2-2.5 2.4-2.5 4"
              strokeLinecap="round"
            />
            <path
              d="M12 17.5v.01"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <p className="text-7xl font-extrabold tracking-tight text-orange-400 sm:text-8xl">
          404
        </p>

        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Looks like you're lost.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#b8aaa0] sm:text-base">
          The page you're looking for doesn't exist
          or may have been moved. Let's get you back
          to something delicious.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition-colors duration-200 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171311]"
          >
            Back to Home
          </Link>

          <Link
            to="/menu"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#49382f] bg-[#211a16] px-7 py-3 font-semibold text-[#f1e7df] transition-colors duration-200 hover:border-orange-400/60 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Explore Menu
          </Link>
        </div>

        <div className="mx-auto mt-12 h-px w-12 bg-orange-500/50" />

        <p className="mt-5 text-xs font-semibold tracking-[0.3em] text-[#8c7769]">
          FOODINO
        </p>
      </section>
    </main>
  );
}
