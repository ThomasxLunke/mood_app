export function LandingFooter() {
  return (
    <footer className="border-t px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p>Ce projet fait partie de mon portfolio.</p>
        <a
          href="https://portfolio-tau-roan.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Voir plus de projets ↗
        </a>
      </div>
    </footer>
  )
}
