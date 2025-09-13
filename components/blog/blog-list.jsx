"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, Calendar, User, Plus, BookOpen, TrendingUp } from "lucide-react"

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [filterCategory, setFilterCategory] = useState("all")

  // Mock blog data
  const [blogs] = useState([
    {
      id: "1",
      title: "Getting Started with Machine Learning in Python",
      excerpt:
        "A comprehensive guide to understanding the basics of machine learning and implementing your first ML model using Python and scikit-learn.",
      content: "Full blog content here...",
      author: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        year: "2024",
        branch: "Computer Science",
      },
      category: "Technology",
      tags: ["Machine Learning", "Python", "Data Science"],
      publishedAt: "2024-01-15T10:00:00Z",
      readTime: 8,
      rating: {
        average: 4.8,
        count: 24,
        userRating: null,
      },
      views: 156,
      featured: true,
    },
    {
      id: "2",
      title: "My Internship Experience at Google",
      excerpt:
        "Sharing my journey as a software engineering intern at Google, the challenges I faced, and the lessons I learned.",
      content: "Full blog content here...",
      author: {
        id: "3",
        name: "Dr. Maria Rodriguez",
        avatar: "/professional-woman-professor.png",
        year: "2018",
        branch: "Computer Science",
      },
      category: "Career",
      tags: ["Internship", "Google", "Software Engineering"],
      publishedAt: "2024-01-12T14:30:00Z",
      readTime: 6,
      rating: {
        average: 4.9,
        count: 18,
        userRating: null,
      },
      views: 203,
      featured: false,
    },
    {
      id: "3",
      title: "Building Scalable Web Applications with Next.js",
      excerpt:
        "Learn how to create performant and scalable web applications using Next.js, including best practices for routing, state management, and deployment.",
      content: "Full blog content here...",
      author: {
        id: "2",
        name: "Alex Kumar",
        avatar: "/professional-man.png",
        year: "2023",
        branch: "Information Technology",
      },
      category: "Technology",
      tags: ["Next.js", "React", "Web Development"],
      publishedAt: "2024-01-10T09:15:00Z",
      readTime: 12,
      rating: {
        average: 4.7,
        count: 31,
        userRating: null,
      },
      views: 289,
      featured: true,
    },
    {
      id: "4",
      title: "The Future of Robotics in Manufacturing",
      excerpt:
        "Exploring how robotics and automation are transforming the manufacturing industry and what it means for future engineers.",
      content: "Full blog content here...",
      author: {
        id: "4",
        name: "David Park",
        avatar: "/professional-man.png",
        year: "2024",
        branch: "Mechanical Engineering",
      },
      category: "Engineering",
      tags: ["Robotics", "Manufacturing", "Automation"],
      publishedAt: "2024-01-08T16:45:00Z",
      readTime: 10,
      rating: {
        average: 4.6,
        count: 15,
        userRating: null,
      },
      views: 127,
      featured: false,
    },
    {
      id: "5",
      title: "Starting Your Own Tech Startup: Lessons Learned",
      excerpt:
        "Key insights and practical advice for students interested in entrepreneurship and starting their own technology companies.",
      content: "Full blog content here...",
      author: {
        id: "5",
        name: "Emma Wilson",
        avatar: "/professional-woman-diverse.png",
        year: "2025",
        branch: "Business Administration",
      },
      category: "Business",
      tags: ["Startup", "Entrepreneurship", "Business"],
      publishedAt: "2024-01-05T11:20:00Z",
      readTime: 7,
      rating: {
        average: 4.5,
        count: 22,
        userRating: null,
      },
      views: 178,
      featured: false,
    },
  ])

  const categories = ["Technology", "Career", "Engineering", "Business", "Research", "Other"]

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      blog.author.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || blog.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.publishedAt) - new Date(a.publishedAt)
      case "oldest":
        return new Date(a.publishedAt) - new Date(b.publishedAt)
      case "rating":
        return b.rating.average - a.rating.average
      case "popular":
        return b.views - a.views
      default:
        return 0
    }
  })

  const featuredBlogs = blogs.filter((blog) => blog.featured)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community Blogs</h1>
          <p className="text-muted-foreground">Discover insights and knowledge shared by your peers</p>
        </div>
        <Button asChild>
          <Link href="/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            Write a Post
          </Link>
        </Button>
      </div>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Featured Posts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBlogs.slice(0, 2).map((blog) => (
              <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">
                        {blog.category}
                      </Badge>
                      <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                        <Link href={`/blogs/${blog.id}`} className="hover:text-primary">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                        <AvatarFallback className="text-xs">{getInitials(blog.author.name)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{blog.author.name}</p>
                        <p className="text-muted-foreground">{formatDate(blog.publishedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{blog.rating.average}</span>
                      </div>
                      <span>•</span>
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search blogs by title, content, tags, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {sortedBlogs.length} post{sortedBlogs.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Blog List */}
      <div className="space-y-6">
        {sortedBlogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{blog.category}</Badge>
                      {blog.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                    <h2 className="text-xl font-semibold">
                      <Link href={`/blogs/${blog.id}`} className="hover:text-primary">
                        {blog.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                        <AvatarFallback>{getInitials(blog.author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{blog.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {blog.author.branch} • {blog.author.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {blog.rating.average} ({blog.rating.count})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blog.views} views</span>
                      </div>
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedBlogs.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button asChild>
                <Link href="/blogs/new">Write the first post</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
