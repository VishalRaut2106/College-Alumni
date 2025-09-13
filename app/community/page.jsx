import Navigation from "@/components/navigation"
import CommunityDirectory from "@/components/community/community-directory"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CommunityDirectory />
      </div>
    </div>
  )
}
