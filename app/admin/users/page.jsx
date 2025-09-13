import Navigation from "@/components/navigation"
import UserManagement from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <UserManagement />
      </div>
    </div>
  )
}
