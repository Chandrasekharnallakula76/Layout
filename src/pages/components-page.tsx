export function ComponentsPage() {
  return (
    <section className="space-y-6 p-6 sm:p-8">
      <div className="space-y-3">
        <span className="bg-chart-2/15 text-chart-2 inline-flex rounded-full px-3 py-1 text-sm font-medium">
          Components route
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Components page with its own route
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base leading-7">
          Add every new component as a separate page here and connect it from
          the sidebar menu using icons and route paths.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Component Library</h2>
          <p className="text-muted-foreground mt-3 leading-7">
            Keep reusable UI sections here, such as forms, cards, tables, and
            workflow widgets.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-6">
          <h2 className="text-xl font-semibold">Next Step</h2>
          <p className="text-muted-foreground mt-3 leading-7">
            Create another page file, add its route, and include a new sidebar
            menu item with a Lucide icon.
          </p>
        </div>
      </div>
    </section>
  )
}
