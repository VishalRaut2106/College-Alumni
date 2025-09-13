import Navigation from "@/components/navigation"
import BlogPost from "@/components/blog/blog-post"

export default function BlogPostPage({ params }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BlogPost blogId={params.id} />
      </div>
    </div>
  )
}
