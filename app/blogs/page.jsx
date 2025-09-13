import Navigation from "@/components/navigation"
import BlogList from "@/components/blog/blog-list"

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BlogList />
      </div>
    </div>
  )
}
