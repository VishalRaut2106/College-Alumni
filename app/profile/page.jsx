import Navigation from "@/components/navigation"
import UserProfile from "@/components/profile/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <UserProfile />
      </div>
    </div>
  )
}
