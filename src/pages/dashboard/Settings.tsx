import { User, Bell, Shield, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
            <User className="w-4 h-4" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-semibold text-muted-foreground">AK</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Amitesh Kumar</p>
              <p className="text-xs text-muted-foreground">amitesh@example.com</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Full Name</Label>
              <input className="mt-1 w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" defaultValue="Amitesh Kumar" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <input className="mt-1 w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" defaultValue="amitesh@example.com" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
            <Bell className="w-4 h-4" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Scan completed", description: "Get notified when a scan finishes" },
            { label: "Weekly digest", description: "Architecture health summary every Monday" },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.description}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground font-medium">
            <Shield className="w-4 h-4" /> Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <button className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            Change Password
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
