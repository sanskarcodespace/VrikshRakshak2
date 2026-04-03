import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { NotificationCard } from "@/components/ui/SpecializedCards";
import { Button } from "@/components/ui/Button";

export default function NotificationsPage() {
  const notifications = [
    { title: "Tree TR-1024 needs watering in Zone B", time: "2 minutes ago", type: "warning" },
    { title: "New protector joined your circle: Sarah", time: "1 hour ago", type: "info" },
    { title: "Project 'Green Valley' reached 50% milestone", time: "3 hours ago", type: "success" },
    { title: "Weekly impact report is now available", time: "5 hours ago", type: "info" },
    { title: "Sensor alert: Low soil moisture in Sector 7", time: "Yesterday", type: "warning" },
    { title: "Deployment successful: 50 new saplings planted", time: "2 days ago", type: "success" },
  ];

  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with real-time alerts and community activity.</p>
        </div>
        <Button variant="ghost">Mark all as read</Button>
      </div>

      <div className="space-y-4 max-w-3xl">
        {notifications.map((n, i) => (
          <NotificationCard key={i} {...n} type={n.type as "info" | "success" | "warning"} />
        ))}
      </div>
    </DashboardContainer>
  );
}
