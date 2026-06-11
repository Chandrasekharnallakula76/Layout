import { useCallback, useRef } from "react"
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
} from "reactflow"

import {
  CustomNode,
  type WorkflowNodeData,
} from "@/components/react-flow/custom-node"
import {
  NodePalette,
  type AgentPaletteItem,
} from "@/components/react-flow/node-palette"

const nodeTypes = {
  workflow: CustomNode,
}

const initialNodes: Node<WorkflowNodeData>[] = []

const initialEdges: Edge[] = []
const builderPanelHeightClass = "min-h-[520px] xl:h-[calc(100vh-14.5rem)]"

type WorkflowCanvasProps = {
  workflowName: string
  workflowDescription: string
}

function WorkflowCanvasInner({
  workflowName,
  workflowDescription,
}: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null)

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((currentEdges) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { strokeWidth: 2.25 },
          },
          currentEdges
        )
      )
    },
    [setEdges]
  )

  const createNode = useCallback(
    (item: AgentPaletteItem, position?: { x: number; y: number }) => {
      const nextIndex = nodes.length + 1
      const fallbackPosition = {
        x: 160 + nodes.length * 36,
        y: 120 + nodes.length * 28,
      }

      const nextNode: Node<WorkflowNodeData> = {
        id: `workflow-node-${crypto.randomUUID()}`,
        type: "workflow",
        position: position ?? fallbackPosition,
        data: {
          label: `${item.label} ${nextIndex}`,
          detail: item.detail,
          badge: item.badge,
        },
      }

      setNodes((currentNodes) => [...currentNodes, nextNode])
    },
    [nodes.length, setNodes]
  )

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
    },
    []
  )

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const rawNode = event.dataTransfer.getData("application/reactflow")
      if (!rawNode || !reactFlowInstance.current || !reactFlowWrapper.current) {
        return
      }

      const item = JSON.parse(rawNode) as AgentPaletteItem

      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      })

      createNode(item, position)
    },
    [createNode]
  )

  return (
    <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <NodePalette
        workflowName={workflowName}
        workflowDescription={workflowDescription}
        panelHeightClass={builderPanelHeightClass}
      />

      <div
        className={`min-h-0 overflow-hidden rounded-[12px] border border-border/70 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,250,252,0.95))] shadow-sm dark:bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_28%),linear-gradient(180deg,rgba(24,24,27,0.96),rgba(15,23,42,0.94))] ${builderPanelHeightClass}`}
      >
        <div
          ref={reactFlowWrapper}
          className="h-full"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <ReactFlow
            fitView
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance) => {
              reactFlowInstance.current = instance
            }}
            className="bg-transparent"
          >
            <MiniMap pannable zoomable />
            <Controls />
            <Background gap={24} size={1.2} variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}

export function WorkflowCanvas({
  workflowName,
  workflowDescription,
}: WorkflowCanvasProps) {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner
        workflowName={workflowName}
        workflowDescription={workflowDescription}
      />
    </ReactFlowProvider>
  )
}
