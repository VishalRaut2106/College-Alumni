import Link from "next/link"
import { ModernNavigation } from "@/components/modern-navigation"
import { ArrowRight, Users, BookOpen, MessageSquare, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ModernNavigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-accent/5" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            🎓 Connect • Share • Grow
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold text-balance mb-8 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Your College Community
            <span className="block text-secondary mt-2">Awaits</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-10 max-w-3xl mx-auto leading-relaxed">
            Join fellow students and alumni in sharing knowledge, discussing ideas, and building lasting connections
            that extend beyond graduation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-accent/5 transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Everything You Need
            </h3>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              A comprehensive platform designed for modern college communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-3">Connect</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Build meaningful relationships with classmates and alumni
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-3">Share Knowledge</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Write blogs and share your expertise with the community
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-3">Discuss</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Join topic-based rooms for engaging conversations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-lg">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-3">Compete</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Climb the leaderboard and showcase your contributions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-muted-foreground text-lg">Active Students</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                1,200+
              </div>
              <div className="text-muted-foreground text-lg">Blog Posts</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-muted-foreground text-lg">Discussion Rooms</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-secondary via-secondary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-accent/90" />
        <div className="container mx-auto text-center relative">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join?</h3>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Connect with your college community today and start building meaningful relationships.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white hover:text-secondary backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href="/signup">
              Join CollegeConnect <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
