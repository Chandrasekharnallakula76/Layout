import { Boxes, LayoutDashboard, PanelLeft } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Components",
    url: "/components",
    icon: Boxes,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="px-3 py-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
        <div className="flex items-center justify-between rounded-2xl border border-sidebar-border/70 bg-sidebar/90 px-2 py-2 shadow-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-[1.1rem] group-data-[collapsible=icon]:border-sidebar-border/50 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:shadow-none">
          <motion.div
            animate={isCollapsed ? "collapsed" : "expanded"}
            className="flex min-w-0 items-center gap-2 overflow-hidden group-data-[collapsible=icon]:hidden"
            initial={false}
            variants={{
              expanded: {
                opacity: 1,
                x: 0,
                width: "auto",
              },
              collapsed: {
                opacity: 0,
                x: -18,
                width: 0,
              },
            }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex size-8 items-center justify-center rounded-xl bg-sidebar-primary/12 text-sidebar-primary">
              <PanelLeft className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Sidebar</p>
            </div>
          </motion.div>
          <SidebarTrigger className="shrink-0 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:rounded-[1.15rem] group-data-[collapsible=icon]:border group-data-[collapsible=icon]:border-sidebar-border/70 group-data-[collapsible=icon]:bg-background group-data-[collapsible=icon]:text-foreground group-data-[collapsible=icon]:shadow-[0_8px_20px_rgba(15,23,42,0.08)] [&_svg]:size-4.5" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
        <SidebarGroup className="p-0 group-data-[collapsible=icon]:mt-4">
          <AnimatePresence initial={false}>
            {!isCollapsed ? (
              <motion.div
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: -14, height: 0 }}
                initial={{ opacity: 0, x: -14, height: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2.5">
              {navigationItems.map((item) => (
                <motion.li
                  key={item.title}
                  animate={isCollapsed ? { x: -3 } : { x: 0 }}
                  className="group/menu-item relative list-none"
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 rounded-xl px-3 text-[0.95rem] font-medium transition-all duration-200 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-9.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-[10px] group-data-[collapsible=icon]:border group-data-[collapsible=icon]:border-violet-200/60 group-data-[collapsible=icon]:bg-violet-500/5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:text-sidebar-foreground/80 group-data-[collapsible=icon]:shadow-[0_4px_14px_rgba(124,58,237,0.07)] [&_svg]:size-5 group-data-[collapsible=icon]:[&_svg]:size-4 group-data-[collapsible=icon]:[&>span]:hidden"
                  >
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-linear-to-r from-violet-500/16 to-fuchsia-500/10 text-violet-700 shadow-sm ring-1 ring-violet-200/70 group-data-[collapsible=icon]:border-violet-200/80 group-data-[collapsible=icon]:bg-violet-500/10 group-data-[collapsible=icon]:text-violet-700 group-data-[collapsible=icon]:shadow-[0_10px_20px_rgba(124,58,237,0.14)] dark:text-violet-300 dark:ring-violet-400/20"
                          : "text-black hover:bg-sidebar-accent/60 hover:text-black group-data-[collapsible=icon]:hover:bg-sidebar-accent/40 dark:text-sidebar-foreground dark:hover:text-sidebar-foreground"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </motion.li>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
