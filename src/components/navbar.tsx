import type { ReactNode } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

type NavbarProps = {
  title: string
  subtitle?: string
  leadingContent?: ReactNode
}

export function Navbar({ title, leadingContent }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-15 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {leadingContent}
          <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 via-blue-600 to-cyan-400 text-sm font-bold tracking-wide text-white shadow-md shadow-fuchsia-500/20">
            DW
          </div>
          <div className="flex flex-col justify-center">
            <p className="bg-primary rounded-md px-3 py-1.5 text-base font-semibold tracking-tight text-primary-foreground shadow-sm">
              {title}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleThemeToggle}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={isDarkMode ? "Light mode" : "Dark mode"}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  )
}
