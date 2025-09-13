import Navigation from "@/components/navigation"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminDashboard />
      </div>
    </div>
  )
}
