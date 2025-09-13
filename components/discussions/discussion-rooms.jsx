"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Users, MessageSquare, Plus, Clock, Video, Lock, Globe, AlertCircle } from "lucide-react"

export default function DiscussionRooms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [filterBranch, setFilterBranch] = useState("all")
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [requestForm, setRequestForm] = useState({
    name: "",
    description: "",
    type: "",
    targetAudience: "",
    reason: "",
  })

  // Mock user's joined rooms (max 3 as per requirements)
  const [userJoinedRooms] = useState(["1", "3", "5"])

  // Mock discussion rooms data
  const [rooms] = useState([
    {
      id: "1",
      name: "CS 2024 Study Group",
      description: "Study group for Computer Science students graduating in 2024",
      type: "year-wise",
      category: "Academic",
      targetYear: "2024",
      targetBranch: "Computer Science",
      memberCount: 45,
      activeMembers: 12,
      lastActivity: "2024-01-15T14:30:00Z",
      isPrivate: false,
      moderators: [
        {
          name: "Sarah Chen",
          avatar: "/professional-woman-diverse.png",
        },
      ],
      meetLink: "https://meet.google.com/abc-defg-hij",
      isUserJoined: true,
      recentMessages: 156,
    },
    {
      id: "2",
      name: "Web Development Enthusiasts",
      description: "Discuss latest trends in web development, share projects and get feedback",
      type: "interest-wise",
      category: "Technology",
      targetYear: "all",
      targetBranch: "all",
      memberCount: 78,
      activeMembers: 23,
      lastActivity: "2024-01-15T16:45:00Z",
      isPrivate: false,
      moderators: [
        {
          name: "Alex Kumar",
          avatar: "/professional-man.png",
        },
      ],
      meetLink: null,
      isUserJoined: false,
      recentMessages: 234,
    },
    {
      id: "3",
      name: "Mechanical Engineering 2023",
      description: "Alumni and current students from Mechanical Engineering",
      type: "branch-wise",
      category: "Academic",
      targetYear: "2023",
      targetBranch: "Mechanical Engineering",
      memberCount: 32,
      activeMembers: 8,
      lastActivity: "2024-01-15T11:20:00Z",
      isPrivate: false,
      moderators: [
        {
          name: "David Park",
          avatar: "/professional-man.png",
        },
      ],
      meetLink: "https://meet.google.com/xyz-uvwx-rst",
      isUserJoined: true,
      recentMessages: 89,
    },
    {
      id: "4",
      name: "Startup Ideas & Entrepreneurship",
      description: "Share startup ideas, discuss business strategies, and network with fellow entrepreneurs",
      type: "interest-wise",
      category: "Business",
      targetYear: "all",
      targetBranch: "all",
      memberCount: 56,
      activeMembers: 15,
      lastActivity: "2024-01-15T13:15:00Z",
      isPrivate: false,
      moderators: [
        {
          name: "Emma Wilson",
          avatar: "/professional-woman-diverse.png",
        },
      ],
      meetLink: null,
      isUserJoined: false,
      recentMessages: 167,
    },
    {
      id: "5",
      name: "Research & Publications",
      description: "Discuss research opportunities, share papers, and collaborate on projects",
      type: "interest-wise",
      category: "Academic",
      targetYear: "all",
      targetBranch: "all",
      memberCount: 29,
      activeMembers: 7,
      lastActivity: "2024-01-15T09:30:00Z",
      isPrivate: true,
      moderators: [
        {
          name: "Dr. Maria Rodriguez",
          avatar: "/professional-woman-professor.png",
        },
      ],
      meetLink: null,
      isUserJoined: true,
      recentMessages: 45,
    },
  ])

  const roomTypes = ["year-wise", "branch-wise", "interest-wise"]
  const categories = ["Academic", "Technology", "Business", "Career", "Social", "Other"]
  const years = ["2025", "2024", "2023", "2022", "2021"]
  const branches = [
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Business Administration",
    "Other",
  ]

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || room.type === filterType
    const matchesYear = filterYear === "all" || room.targetYear === filterYear || room.targetYear === "all"
    const matchesBranch = filterBranch === "all" || room.targetBranch === filterBranch || room.targetBranch === "all"

    return matchesSearch && matchesType && matchesYear && matchesBranch
  })

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    // TODO: Submit room creation request
    console.log("Room request submitted:", requestForm)
    setIsRequestDialogOpen(false)
    setRequestForm({
      name: "",
      description: "",
      type: "",
      targetAudience: "",
      reason: "",
    })
  }

  const handleJoinRoom = (roomId) => {
    if (userJoinedRooms.length >= 3) {
      alert("You can only join up to 3 discussion rooms. Please leave a room first.")
      return
    }
    // TODO: Join room logic
    console.log("Joining room:", roomId)
  }

  const formatLastActivity = (dateString) => {
    const now = new Date()
    const activity = new Date(dateString)
    const diffInHours = Math.floor((now - activity) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Active now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discussion Rooms</h1>
          <p className="text-muted-foreground">
            Join conversations with your peers • You're in {userJoinedRooms.length}/3 rooms
          </p>
        </div>
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Request New Discussion Room</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomName">Room Name *</Label>
                <Input
                  id="roomName"
                  value={requestForm.name}
                  onChange={(e) => setRequestForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., AI/ML Study Group"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type *</Label>
                <Select
                  value={requestForm.type}
                  onValueChange={(value) => setRequestForm((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year-wise">Year-wise</SelectItem>
                    <SelectItem value="branch-wise">Branch-wise</SelectItem>
                    <SelectItem value="interest-wise">Interest-wise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={requestForm.targetAudience}
                  onChange={(e) => setRequestForm((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="e.g., CS 2024, All branches, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={requestForm.description}
                  onChange={(e) => setRequestForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the purpose and topics for this room"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request</Label>
                <Textarea
                  id="reason"
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm((prev) => ({ ...prev, reason: e.target.value }))}
                  placeholder="Why is this room needed?"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* User's Joined Rooms */}
      {userJoinedRooms.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Rooms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms
              .filter((room) => userJoinedRooms.includes(room.id))
              .map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow border-primary/20">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm line-clamp-1">{room.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{room.description}</p>
                        </div>
                        {room.isPrivate && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{room.activeMembers} active</span>
                        </div>
                        <span>{formatLastActivity(room.lastActivity)}</span>
                      </div>
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/discussions/${room.id}`}>Enter Room</Link>
                      </Button>
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
                placeholder="Search discussion rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {roomTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Limit Warning */}
      {userJoinedRooms.length >= 3 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">
                You've reached the maximum limit of 3 discussion rooms. Leave a room to join a new one.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Rooms */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Rooms ({filteredRooms.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {room.type.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {room.category}
                      </Badge>
                      {room.isPrivate && <Lock className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <CardTitle className="text-lg line-clamp-1">{room.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{room.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{room.memberCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span>{room.recentMessages}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{formatLastActivity(room.lastActivity)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={room.moderators[0].avatar || "/placeholder.svg"} alt={room.moderators[0].name} />
                    <AvatarFallback className="text-xs">{getInitials(room.moderators[0].name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Moderated by {room.moderators[0].name}</span>
                </div>

                {room.meetLink && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <Video className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700">Live meeting available</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {room.isUserJoined ? (
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/discussions/${room.id}`}>Enter Room</Link>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleJoinRoom(room.id)}
                      disabled={userJoinedRooms.length >= 3}
                    >
                      Join Room
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/discussions/${room.id}`}>
                      <Globe className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => setIsRequestDialogOpen(true)}>Request a New Room</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
