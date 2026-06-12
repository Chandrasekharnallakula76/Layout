import { Handle, Position, useNodeId, useStore, type Edge, type NodeProps } from "reactflow"

type WorkflowNodeData = {
  label: string
  detail?: string
  badge?: string
}

const handleBaseClassName =
  "!h-3 !w-3 !border-2 !border-background !bg-primary !opacity-0 transition-opacity duration-150 group-hover:!opacity-100"

function getConnectedSides(nodeId: string, edges: Edge[]) {
  const sides = new Set<string>()

  edges.forEach((edge) => {
    if (edge.source === nodeId && edge.sourceHandle) {
      sides.add(edge.sourceHandle)
    }

    if (edge.target === nodeId && edge.targetHandle) {
      sides.add(edge.targetHandle)
    }
  })

  return sides
}

export function CustomNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  const nodeId = useNodeId()
  const visibleHandles = useStore((state) => {
    if (!nodeId) {
      return []
    }

    const connectedSides = getConnectedSides(nodeId, state.edges)

    if (
      state.connectionStartHandle?.nodeId === nodeId &&
      state.connectionStartHandle.handleId
    ) {
      connectedSides.add(state.connectionStartHandle.handleId)
    }

    return Array.from(connectedSides)
  })

  const isHandleVisible = (handleId: string) => visibleHandles.includes(handleId)

  const badgeLabel = data.badge?.trim() || "Agent"
  const detailText = data.detail?.trim()

  return (
    <div
      className={`group min-w-[200px] rounded-[18px] border bg-card px-3.5 py-3 shadow-sm transition-all ${
        selected
          ? "border-primary ring-4 ring-primary/15"
          : "border-border/70 hover:border-primary/35"
      }`}
    >
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className={`${handleBaseClassName} ${isHandleVisible("top") ? "!opacity-100" : ""}`}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className={`${handleBaseClassName} ${isHandleVisible("right") ? "!opacity-100" : ""}`}
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className={`${handleBaseClassName} ${isHandleVisible("bottom") ? "!opacity-100" : ""}`}
      />
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className={`${handleBaseClassName} ${isHandleVisible("left") ? "!opacity-100" : ""}`}
      />

      <div className="mb-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
        {badgeLabel}
      </div>
      <h3 className="text-[13px] font-semibold leading-tight text-foreground">
        {data.label}
      </h3>
      {detailText ? (
        <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
          {detailText}
        </p>
      ) : null}
    </div>
  )
}

export type { WorkflowNodeData }
