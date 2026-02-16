import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { Progress } from "@/components/ui/progress";

const MOCK_USAGE = { used: 2, limit: 4 };

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-14 border-b border-border flex items-center px-4 gap-3 shrink-0 bg-background">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">
                  {MOCK_USAGE.used}/{MOCK_USAGE.limit} scans
                </span>
                <Progress value={(MOCK_USAGE.used / MOCK_USAGE.limit) * 100} className="w-16 h-1.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">AK</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
