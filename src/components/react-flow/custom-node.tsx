import { Handle, Position, useNodeId, useStore, type Edge, type NodeProps } from "reactflow"

type WorkflowNodeData = {
  label: string
  detail: string
  badge: string
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

  return (
    <div
      className={`group min-w-52 rounded-2xl border bg-card p-4 shadow-sm transition-all ${
        selected
          ? "border-primary ring-4 ring-primary/15"
          : "border-border/70 hover:border-primary/40"
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

      <div className="mb-3 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.12em] text-primary uppercase">
        {data.badge}
      </div>
      <h3 className="text-sm font-semibold text-foreground">{data.label}</h3>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {data.detail}
      </p>
    </div>
  )
}

export type { WorkflowNodeData }
