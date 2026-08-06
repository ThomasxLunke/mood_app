const STACK = ['Next.js', 'React', 'shadcn/ui', 'Prisma', 'Clerk', 'Langchain']

// Server Component: the border glow is pure CSS (a rotating conic-gradient
// layer revealed through 1px of padding), no mousemove/JS needed — unlike
// SpotlightCard, this doesn't have to be a client component.
export function TechStackBadges() {
  return (
    <section id="stack" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Sous le capot
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance">
          Une stack moderne, de bout en bout
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {STACK.map((tech) => (
            <div
              key={tech}
              className="group relative isolate overflow-hidden rounded-xl p-px"
            >
              <div
                aria-hidden
                className="absolute inset-[-60%] -z-10 animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:animate-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, hsl(var(--chart-1)), hsl(var(--chart-2)), hsl(var(--chart-3)), hsl(var(--chart-4)), hsl(var(--chart-5)), hsl(var(--chart-1)))',
                }}
              />
              <span className="relative block rounded-[11px] border bg-card px-5 py-3 text-sm font-medium">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
