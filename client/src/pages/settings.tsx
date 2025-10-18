import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  User, 
  Bell, 
  Shield,
  Palette
} from "lucide-react";

export default function Settings() {
  return (
    <div className="flex-1 p-6 lg:p-8 content-focus" data-testid="page-settings">
      <div className="space-y-2 mb-8">
        <h1 className="visual-hierarchy-1">Settings</h1>
        <p className="scan-paragraph text-muted-foreground">
          Manage your account preferences and configuration
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="first-name" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input id="first-name" placeholder="John" data-testid="input-first-name" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="last-name" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input id="last-name" placeholder="Advisor" data-testid="input-last-name" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john@wealthvision.com" data-testid="input-email" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="firm" className="text-sm font-medium">
                  Firm Name
                </Label>
                <Input id="firm" placeholder="WealthVision Advisors" data-testid="input-firm" />
              </div>

              <div className="pt-6 border-t">
                <Button data-testid="button-save-profile">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Theme Preferences</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground mb-1">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark color schemes
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
              <p className="text-muted-foreground">
                Configure your notification preferences
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader className="border-b spacing-sm">
              <CardTitle className="visual-hierarchy-3">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="spacing-md">
              <p className="text-muted-foreground">
                Manage security preferences and authentication
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
