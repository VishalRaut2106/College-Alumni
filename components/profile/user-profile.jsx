"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Edit,
  Calendar,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Mail,
  Star,
  BookOpen,
  MessageSquare,
} from "lucide-react"

export default function UserProfile() {
  // Mock user data - in real app this would come from API/database
  const [user] = useState({
    id: "1",
    fullName: "Sarah Chen",
    email: "sarah.chen@college.edu",
    avatar: "/professional-woman-diverse.png",
    year: "2024",
    branch: "Computer Science",
    role: "student",
    bio: "Passionate computer science student interested in AI/ML and web development. Love contributing to open source projects and helping fellow students.",
    skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning", "Data Structures"],
    projects: [
      {
        name: "Student Portal App",
        description: "A full-stack web application for managing student activities",
        tech: ["React", "Node.js", "MongoDB"],
      },
      {
        name: "ML Recommendation System",
        description: "Machine learning model for course recommendations",
        tech: ["Python", "TensorFlow", "Pandas"],
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      portfolio: "https://sarahchen.dev",
    },
    privacy: {
      allowContactExchange: true,
      showEmail: true,
      showPhone: false,
    },
    stats: {
      blogPosts: 12,
      averageRating: 4.9,
      totalRatings: 45,
      discussionRooms: 3,
    },
    joinedDate: "2023-08-15",
  })

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
                <AvatarFallback className="text-2xl">{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(user.stats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.stats.averageRating} ({user.stats.totalRatings} reviews)
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.fullName}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>
                      {user.branch} • Class of {user.year}
                    </span>
                    <Badge variant="secondary" className="ml-2">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined{" "}
                      {new Date(user.joinedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/profile/edit">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </div>

              <p className="text-muted-foreground">{user.bio}</p>

              {/* Contact Information */}
              <div className="flex flex-wrap gap-4">
                {user.privacy.showEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user.links.linkedin && (
                  <a
                    href={user.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {user.links.github && (
                  <a
                    href={user.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {user.links.portfolio && (
                  <a
                    href={user.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm">Blog Posts</span>
              </div>
              <span className="font-semibold">{user.stats.blogPosts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm">Discussion Rooms</span>
              </div>
              <span className="font-semibold">{user.stats.discussionRooms}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Avg Rating</span>
              </div>
              <span className="font-semibold">{user.stats.averageRating}</span>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-sm">{project.name}</h4>
                <p className="text-xs text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {index < user.projects.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Blog Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No blog posts yet. Start sharing your knowledge!</p>
            <Button className="mt-4" asChild>
              <Link href="/blogs/new">Write Your First Post</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
