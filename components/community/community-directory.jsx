"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Star, BookOpen, MessageSquare } from "lucide-react"

export default function CommunityDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterYear, setFilterYear] = useState("all")
  const [filterBranch, setFilterBranch] = useState("all")
  const [filterRole, setFilterRole] = useState("all")

  // Mock community data
  const [members] = useState([
    {
      id: "1",
      fullName: "Sarah Chen",
      avatar: "/professional-woman-diverse.png",
      year: "2024",
      branch: "Computer Science",
      role: "student",
      bio: "Passionate about AI/ML and web development",
      skills: ["JavaScript", "Python", "React", "Machine Learning"],
      stats: { blogPosts: 12, averageRating: 4.9, discussionRooms: 3 },
      links: { linkedin: "https://linkedin.com/in/sarahchen", github: "https://github.com/sarahchen" },
    },
    {
      id: "2",
      fullName: "Alex Kumar",
      avatar: "/professional-man.png",
      year: "2023",
      branch: "Information Technology",
      role: "student",
      bio: "Full-stack developer and open source contributor",
      skills: ["Node.js", "React", "MongoDB", "Docker"],
      stats: { blogPosts: 8, averageRating: 4.8, discussionRooms: 2 },
      links: { github: "https://github.com/alexkumar", portfolio: "https://alexkumar.dev" },
    },
    {
      id: "3",
      fullName: "Dr. Maria Rodriguez",
      avatar: "/professional-woman-professor.png",
      year: "2018",
      branch: "Computer Science",
      role: "alumni",
      bio: "Senior Software Engineer at Google, PhD in Computer Science",
      skills: ["System Design", "Leadership", "Python", "Go"],
      stats: { blogPosts: 25, averageRating: 4.9, discussionRooms: 5 },
      links: { linkedin: "https://linkedin.com/in/mariarodriguez" },
    },
    {
      id: "4",
      fullName: "David Park",
      avatar: "/professional-man.png",
      year: "2024",
      branch: "Mechanical Engineering",
      role: "student",
      bio: "Interested in robotics and automation",
      skills: ["CAD", "Python", "Robotics", "3D Printing"],
      stats: { blogPosts: 6, averageRating: 4.6, discussionRooms: 1 },
      links: { portfolio: "https://davidpark.dev" },
    },
    {
      id: "5",
      fullName: "Emma Wilson",
      avatar: "/professional-woman-diverse.png",
      year: "2025",
      branch: "Business Administration",
      role: "student",
      bio: "Aspiring entrepreneur with focus on tech startups",
      skills: ["Business Strategy", "Marketing", "Finance", "Leadership"],
      stats: { blogPosts: 9, averageRating: 4.5, discussionRooms: 4 },
      links: { linkedin: "https://linkedin.com/in/emmawilson" },
    },
  ])

  const branches = [
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Business Administration",
    "Other",
  ]
  const years = ["2025", "2024", "2023", "2022", "2021", "2020"]
  const roles = ["student", "alumni", "staff"]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesYear = filterYear === "all" || member.year === filterYear
    const matchesBranch = filterBranch === "all" || member.branch === filterBranch
    const matchesRole = filterRole === "all" || member.role === filterRole

    return matchesSearch && matchesYear && matchesBranch && matchesRole
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
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Community Directory</h1>
        <p className="text-muted-foreground">Connect with students, alumni, and faculty from your college</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, bio, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterBranch} onValueChange={setFilterBranch}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.fullName} />
                  <AvatarFallback>{getInitials(member.fullName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{member.fullName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.branch} • {member.year}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{member.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {member.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{member.skills.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{member.stats.blogPosts}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{member.stats.averageRating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{member.stats.discussionRooms}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                <Link href={`/profile/${member.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No members found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
