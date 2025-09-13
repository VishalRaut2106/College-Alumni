import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, MessageSquare, Users, Star } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Share Knowledge",
      description: "Write and discover insightful blogs from fellow students and alumni",
    },
    {
      icon: MessageSquare,
      title: "Join Discussions",
      description: "Participate in topic-based discussion rooms with your peers",
    },
    {
      icon: Users,
      title: "Build Network",
      description: "Connect with students and alumni from your college community",
    },
  ]

  const topWriters = [
    { name: "Sarah Chen", rating: 4.9, posts: 12 },
    { name: "Alex Kumar", rating: 4.8, posts: 8 },
    { name: "Maria Rodriguez", rating: 4.7, posts: 15 },
    { name: "David Park", rating: 4.6, posts: 6 },
    { name: "Emma Wilson", rating: 4.5, posts: 9 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Connect, Learn, and Grow with Your <span className="text-primary">College Community</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Join a vibrant platform where students and alumni share knowledge, engage in meaningful discussions, and
            build lasting professional connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blogs">Explore Blogs</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Top Writers Leaderboard */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Top Contributors</h2>
            <p className="text-muted-foreground">Celebrating our most active community members</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                {topWriters.map((writer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{writer.name}</p>
                        <p className="text-sm text-muted-foreground">{writer.posts} posts</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{writer.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
