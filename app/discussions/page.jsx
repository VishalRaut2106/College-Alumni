import Navigation from "@/components/navigation"
import DiscussionRooms from "@/components/discussions/discussion-rooms"

export default function DiscussionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <DiscussionRooms />
      </div>
    </div>
  )
}
