import { type FormEvent, type ReactNode, useEffect, useState } from "react"
import { GitBranch, Loader2, Moon, Plus, Sun } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/theme-provider"

type NavbarProps = {
  title: string
  subtitle?: string
  leadingContent?: ReactNode
}

export function Navbar({ leadingContent }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const navigate = useNavigate()
  const location = useLocation()
  const isWorkflowBuilderRoute = location.pathname === "/workflow/new"
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false)
  const [workflowName, setWorkflowName] = useState("")
  const [workflowDescription, setWorkflowDescription] = useState("")

  useEffect(() => {
    if (!isCreateDialogOpen) {
      setIsCreatingWorkflow(false)
      setWorkflowName("")
      setWorkflowDescription("")
    }
  }, [isCreateDialogOpen])

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  const handleCreateWorkflow = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedWorkflowName = workflowName.trim()
    const trimmedWorkflowDescription = workflowDescription.trim()

    if (!trimmedWorkflowName) {
      return
    }

    setIsCreatingWorkflow(true)

    window.setTimeout(() => {
      setIsCreateDialogOpen(false)
      navigate("/workflow/new", {
        state: {
          workflowName: trimmedWorkflowName,
          workflowDescription: trimmedWorkflowDescription,
        },
      })
    }, 450)
  }

  return (
    <>
      <header className="sticky top-0 z-10 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="flex h-15 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {leadingContent}

            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 via-blue-600 to-cyan-400 text-xs font-bold tracking-wide text-white shadow-md shadow-fuchsia-500/20">
              DW
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isWorkflowBuilderRoute ? null : (
              <Button
                size="sm"
                className={`rounded-[14px] border border-violet-200/80 bg-white font-medium text-violet-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:bg-violet-50 hover:text-violet-800 dark:border-violet-400/20 dark:bg-white/10 dark:text-violet-100 dark:hover:bg-white/15 ${
                  isWorkflowBuilderRoute ? "h-11 px-5 text-base" : "h-10 px-4"
                }`}
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus
                  className={isWorkflowBuilderRoute ? "size-4.5" : "size-4"}
                />
                <span>Create</span>
                <GitBranch
                  className={
                    isWorkflowBuilderRoute
                      ? "size-4.5 opacity-70"
                      : "size-4 opacity-70"
                  }
                />
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={handleThemeToggle}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDarkMode ? "Light mode" : "Dark mode"}
              className="size-10 rounded-[12px] border-violet-200/80 bg-white text-violet-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:bg-violet-50 hover:text-violet-800 dark:border-violet-400/20 dark:bg-white/10 dark:text-violet-100 dark:hover:bg-white/15"
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>
      </header>

      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={(nextOpen) => {
          if (isCreatingWorkflow) {
            return
          }

          setIsCreateDialogOpen(nextOpen)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create workflow</DialogTitle>
            <DialogDescription>
              Enter a workflow name and description before opening the builder.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleCreateWorkflow}>
            <div className="space-y-2">
              <Label htmlFor="workflow-name">Workflow name</Label>
              <Input
                id="workflow-name"
                value={workflowName}
                onChange={(event) => setWorkflowName(event.target.value)}
                placeholder="Enter workflow name"
                autoFocus
                disabled={isCreatingWorkflow}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workflow-description">Description</Label>
              <Textarea
                id="workflow-description"
                value={workflowDescription}
                onChange={(event) => setWorkflowDescription(event.target.value)}
                placeholder="Enter workflow description"
                rows={4}
                disabled={isCreatingWorkflow}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={isCreatingWorkflow}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!workflowName.trim() || isCreatingWorkflow}
              >
                {isCreatingWorkflow ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
