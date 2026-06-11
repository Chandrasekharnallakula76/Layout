import { Navigate, Route, Routes } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ComponentsPage } from "@/pages/components-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { WorkflowBuilderPage } from "@/pages/workflow-builder-page"

const App = () => {
  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="h-screen overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <Navbar
          title="Dynamic workflow"
          leadingContent={<SidebarTrigger className="md:hidden" />}
        />

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/workflow/new" element={<WorkflowBuilderPage />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
