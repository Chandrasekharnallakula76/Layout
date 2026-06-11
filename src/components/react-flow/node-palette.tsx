import type { DragEvent } from "react"
import { Box } from "lucide-react"

export const agentPaletteItems = [
  {
    type: "research-agent",
    label: "Research Agent",
  },
  {
    type: "planning-agent",
    label: "Planning Agent",
  },
  {
    type: "writer-agent",
    label: "Writer Agent",
  },
  {
    type: "review-agent",
    label: "Review Agent",
  },
  {
    type: "design-agent",
    label: "Design Agent",
  },
  {
    type: "automation-agent",
    label: "Automation Agent",
  },
  {
    type: "publish-agent",
    label: "Publish Agent",
  },
]

export type AgentPaletteItem = (typeof agentPaletteItems)[number]

type NodePaletteProps = {
  workflowName: string
  workflowDescription: string
  panelHeightClass: string
}

export function NodePalette({
  workflowName,
  workflowDescription,
  panelHeightClass,
}: NodePaletteProps) {
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    item: AgentPaletteItem
  ) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(item))
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside
      className={`flex min-h-0 w-full flex-col overflow-hidden rounded-[12px] border border-border/60 bg-card shadow-sm lg:w-72 ${panelHeightClass}`}
    >
      <div className="border-b border-border/60 px-4 py-3">
        <p className="text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
          Agents
        </p>
      </div>

      <div className="flex-1 [scrollbar-width:none] space-y-1.5 overflow-y-auto p-2.5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {agentPaletteItems.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
            className="group cursor-grab rounded-[11px] border border-border/70 bg-background px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm active:cursor-grabbing"
          >
            <div className="flex items-center gap-2.25">
              <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-[9px] border border-primary/15 bg-primary/10 text-primary transition-all group-hover:border-primary/25 group-hover:bg-primary/15">
                <Box className="h-3.25 w-3.25" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[12px] leading-tight font-semibold text-foreground">
                  {item.label}
                </h3>

                <p className="mt-0.5 truncate text-[10px] leading-tight text-muted-foreground">
                  {item.type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
