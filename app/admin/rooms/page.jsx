import Navigation from "@/components/navigation"
import RoomManagement from "@/components/admin/room-management"

export default function AdminRoomsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RoomManagement />
      </div>
    </div>
  )
}
