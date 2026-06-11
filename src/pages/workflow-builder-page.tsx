import "reactflow/dist/style.css"

import { PencilLine, Save } from "lucide-react"
import { useLocation } from "react-router-dom"

import { WorkflowCanvas } from "@/components/react-flow/workflow-canvas"
import { Button } from "@/components/ui/button"

type WorkflowLocationState = {
  workflowName?: string
  workflowDescription?: string
}

export function WorkflowBuilderPage() {
  const location = useLocation()
  const state = (location.state as WorkflowLocationState | null) ?? null

  const workflowName = state?.workflowName?.trim() || "Untitled workflow"
  const workflowDescription = state?.workflowDescription?.trim() || ""

  return (
    <section className="flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_24%)] p-4 sm:p-6">
      <div className="rounded-sm border border-border/60 bg-background/95 px-3 py-2 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold tracking-[0.22em] text-primary/80 uppercase">
              Workflow Builder
            </p>

            <h1 className="mt-0.5 truncate text-base font-semibold tracking-tight text-foreground">
              {workflowName}
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              className="h-7 rounded-lg border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            >
              <PencilLine className="size-3" />
              <span>Add/Edit</span>
            </Button>

            <Button className="h-7 rounded-lg bg-slate-900 px-2.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 dark:bg-violet-500 dark:hover:bg-violet-400">
              <Save className="size-3" />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>

      <WorkflowCanvas
        workflowName={workflowName}
        workflowDescription={workflowDescription}
      />
    </section>
  )
}
