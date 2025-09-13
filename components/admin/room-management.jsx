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
import {
  ArrowLeft,
  Search,
  Plus,
  Users,
  MessageSquare,
  Settings,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Lock,
  Globe,
} from "lucide-react"

export default function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    type: "",
    targetAudience: "",
    isPrivate: false,
  })

  // Mock rooms data
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
      messageCount: 1247,
      createdAt: "2023-08-15T00:00:00Z",
      lastActivity: "2024-01-15T14:30:00Z",
      isPrivate: false,
      status: "active",
      moderators: [
        {
          id: "1",
          name: "Sarah Chen",
          avatar: "/professional-woman-diverse.png",
        },
      ],
      meetLink: "https://meet.google.com/abc-defg-hij",
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
      messageCount: 2156,
      createdAt: "2023-09-01T00:00:00Z",
      lastActivity: "2024-01-15T16:45:00Z",
      isPrivate: false,
      status: "active",
      moderators: [
        {
          id: "2",
          name: "Alex Kumar",
          avatar: "/professional-man.png",
        },
      ],
      meetLink: null,
    },
    {
      id: "3",
      name: "AI Ethics Discussion",
      description: "Discuss ethical implications of AI in modern society",
      type: "interest-wise",
      category: "Academic",
      targetYear: "all",
      targetBranch: "all",
      memberCount: 0,
      activeMembers: 0,
      messageCount: 0,
      createdAt: "2024-01-15T12:20:00Z",
      lastActivity: null,
      isPrivate: false,
      status: "pending",
      requestedBy: {
        id: "2",
        name: "Alex Kumar",
        avatar: "/professional-man.png",
      },
      moderators: [],
      meetLink: null,
    },
  ])

  // Mock room requests
  const [roomRequests] = useState([
    {
      id: "1",
      name: "Machine Learning Research",
      description: "Collaborate on ML research projects and share findings",
      type: "interest-wise",
      targetAudience: "Graduate students and researchers",
      requestedBy: {
        id: "3",
        name: "Dr. Maria Rodriguez",
        avatar: "/professional-woman-professor.png",
      },
      reason: "Need a dedicated space for ML research collaboration",
      requestedAt: "2024-01-14T10:30:00Z",
      status: "pending",
    },
    {
      id: "2",
      name: "Business Administration 2025",
      description: "Discussion room for BA students graduating in 2025",
      type: "year-wise",
      targetAudience: "BA 2025 students",
      requestedBy: {
        id: "5",
        name: "Emma Wilson",
        avatar: "/professional-woman-diverse.png",
      },
      reason: "Current BA students need their own discussion space",
      requestedAt: "2024-01-13T15:45:00Z",
      status: "pending",
    },
  ])

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || room.type === filterType
    const matchesStatus = filterStatus === "all" || room.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const formatDate = (dateString) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleRoomAction = (roomId, action) => {
    // TODO: Implement room actions
    console.log(`${action} room:`, roomId)
  }

  const handleRequestAction = (requestId, action) => {
    // TODO: Implement request actions
    console.log(`${action} request:`, requestId)
  }

  const handleCreateRoom = (e) => {
    e.preventDefault()
    // TODO: Create new room
    console.log("Creating room:", newRoom)
    setIsCreateDialogOpen(false)
    setNewRoom({
      name: "",
      description: "",
      type: "",
      targetAudience: "",
      isPrivate: false,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Room Management</h1>
            <p className="text-muted-foreground">Manage discussion rooms and requests</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Room</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomName">Room Name *</Label>
                <Input
                  id="roomName"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Data Science Discussion"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type *</Label>
                <Select
                  value={newRoom.type}
                  onValueChange={(value) => setNewRoom((prev) => ({ ...prev, type: value }))}
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
                  value={newRoom.targetAudience}
                  onChange={(e) => setNewRoom((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="e.g., CS 2024, All branches, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the purpose of this room"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Create Room
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{rooms.filter((r) => r.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Active Rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{roomRequests.length}</div>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{rooms.reduce((sum, room) => sum + room.memberCount, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{rooms.reduce((sum, room) => sum + room.messageCount, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Room Requests */}
      {roomRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Room Requests ({roomRequests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.name}</h3>
                        <Badge variant="outline">{request.type.replace("-", " ")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={request.requestedBy.avatar || "/placeholder.svg"}
                              alt={request.requestedBy.name}
                            />
                            <AvatarFallback className="text-xs">{getInitials(request.requestedBy.name)}</AvatarFallback>
                          </Avatar>
                          <span>Requested by {request.requestedBy.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(request.requestedAt)}</span>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded text-sm">
                        <strong>Reason:</strong> {request.reason}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleRequestAction(request.id, "approve")}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRequestAction(request.id, "reject")}>
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search rooms by name or description..."
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
                  <SelectItem value="year-wise">Year-wise</SelectItem>
                  <SelectItem value="branch-wise">Branch-wise</SelectItem>
                  <SelectItem value="interest-wise">Interest-wise</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms List */}
      <Card>
        <CardHeader>
          <CardTitle>Discussion Rooms ({filteredRooms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRooms.map((room) => (
              <div key={room.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{room.name}</h3>
                      <Badge variant="outline">{room.type.replace("-", " ")}</Badge>
                      <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                      {room.isPrivate && <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{room.description}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{room.memberCount} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{room.messageCount} messages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Last active: {formatDate(room.lastActivity)}</span>
                      </div>
                    </div>
                    {room.moderators.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          {room.moderators.map((mod) => (
                            <div key={mod.id} className="flex items-center gap-1">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={mod.avatar || "/placeholder.svg"} alt={mod.name} />
                                <AvatarFallback className="text-xs">{getInitials(mod.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{mod.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/discussions/${room.id}`}>
                        <Globe className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </Button>
                    {room.status === "active" && (
                      <Button size="sm" variant="outline" onClick={() => handleRoomAction(room.id, "suspend")}>
                        Suspend
                      </Button>
                    )}
                    {room.status === "suspended" && (
                      <Button size="sm" variant="outline" onClick={() => handleRoomAction(room.id, "activate")}>
                        Activate
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => handleRoomAction(room.id, "delete")}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
