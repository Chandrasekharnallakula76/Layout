export function DashboardPage() {
  return (
    <section className="space-y-6 p-6 sm:p-8">
      <div className="space-y-3">
        <span className="bg-primary/10 text-primary inline-flex rounded-full px-3 py-1 text-sm font-medium">
          Dashboard route
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome to the dynamic workflow dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base leading-7">
          This page is connected using React Router. You can keep adding new
          components as separate routes from the sidebar menu.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["Projects", "Tasks", "Reports"].map((item, index) => (
          <article
            key={item}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
          >
            <p className="text-muted-foreground text-sm">Section 0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{item}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Use this card area for workflow data, summaries, or widgets.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
