import Navigation from "@/components/navigation"
import CreateBlog from "@/components/blog/create-blog"

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CreateBlog />
      </div>
    </div>
  )
}
