import Navigation from "@/components/navigation"
import EditProfile from "@/components/profile/edit-profile"

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <EditProfile />
      </div>
    </div>
  )
}
