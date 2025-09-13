import Navigation from "@/components/navigation"
import ContentModeration from "@/components/admin/content-moderation"

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ContentModeration />
      </div>
    </div>
  )
}
