"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, MoreHorizontal, UserCheck, UserX, Mail, GraduationCap, AlertTriangle } from "lucide-react"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)

  // Mock users data
  const [users] = useState([
    {
      id: "1",
      fullName: "Sarah Chen",
      email: "sarah.chen@college.edu",
      avatar: "/professional-woman-diverse.png",
      role: "student",
      status: "active",
      year: "2024",
      branch: "Computer Science",
      joinedDate: "2023-08-15T00:00:00Z",
      lastActive: "2024-01-15T14:30:00Z",
      blogPosts: 12,
      discussionRooms: 3,
      reports: 0,
      verified: true,
    },
    {
      id: "2",
      fullName: "Alex Kumar",
      email: "alex.kumar@college.edu",
      avatar: "/professional-man.png",
      role: "student",
      status: "active",
      year: "2023",
      branch: "Information Technology",
      joinedDate: "2022-08-20T00:00:00Z",
      lastActive: "2024-01-15T16:45:00Z",
      blogPosts: 8,
      discussionRooms: 2,
      reports: 0,
      verified: true,
    },
    {
      id: "3",
      fullName: "Dr. Maria Rodriguez",
      email: "m.rodriguez@alumni.college.edu",
      avatar: "/professional-woman-professor.png",
      role: "alumni",
      status: "active",
      year: "2018",
      branch: "Computer Science",
      joinedDate: "2023-09-01T00:00:00Z",
      lastActive: "2024-01-15T11:20:00Z",
      blogPosts: 25,
      discussionRooms: 5,
      reports: 0,
      verified: true,
    },
    {
      id: "4",
      fullName: "Michael Johnson",
      email: "m.johnson@alumni.college.edu",
      avatar: "/professional-man.png",
      role: "alumni",
      status: "pending",
      year: "2019",
      branch: "Business Administration",
      joinedDate: "2024-01-15T09:00:00Z",
      lastActive: "2024-01-15T09:00:00Z",
      blogPosts: 0,
      discussionRooms: 0,
      reports: 0,
      verified: false,
    },
    {
      id: "5",
      fullName: "Emma Wilson",
      email: "emma.wilson@college.edu",
      avatar: "/professional-woman-diverse.png",
      role: "student",
      status: "suspended",
      year: "2025",
      branch: "Business Administration",
      joinedDate: "2023-08-25T00:00:00Z",
      lastActive: "2024-01-10T13:15:00Z",
      blogPosts: 9,
      discussionRooms: 4,
      reports: 2,
      verified: true,
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branch.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const formatDate = (dateString) => {
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
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800"
      case "alumni":
        return "bg-purple-100 text-purple-800"
      case "staff":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-red-100 text-red-800"
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

  const handleUserAction = (userId, action) => {
    // TODO: Implement user actions (approve, suspend, etc.)
    console.log(`${action} user:`, userId)
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
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage users, approvals, and permissions</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "alumni").length}</div>
            <p className="text-sm text-muted-foreground">Alumni</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.filter((u) => u.reports > 0).length}</div>
            <p className="text-sm text-muted-foreground">Reported Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
                    <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{user.fullName}</h3>
                      {user.verified && <UserCheck className="w-4 h-4 text-green-600" />}
                      {user.reports > 0 && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="w-3 h-3" />
                      <span>
                        {user.branch} • {user.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                    <div className="text-muted-foreground">
                      <div>
                        Posts: {user.blogPosts} • Rooms: {user.discussionRooms}
                      </div>
                      <div>Last active: {formatDate(user.lastActive)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {user.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => handleUserAction(user.id, "approve")}>
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "reject")}>
                          <UserX className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {user.status === "active" && (
                      <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "suspend")}>
                        Suspend
                      </Button>
                    )}
                    {user.status === "suspended" && (
                      <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "reactivate")}>
                        Reactivate
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsUserDialogOpen(true)
                      }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.fullName} />
                  <AvatarFallback>{getInitials(selectedUser.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.fullName}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getRoleColor(selectedUser.role)}>{selectedUser.role}</Badge>
                    <Badge className={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Academic Info</Label>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <p>{selectedUser.branch}</p>
                    <p>Class of {selectedUser.year}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Activity</Label>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <p>{selectedUser.blogPosts} blog posts</p>
                    <p>{selectedUser.discussionRooms} discussion rooms</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Joined</Label>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(selectedUser.joinedDate)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Active</Label>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(selectedUser.lastActive)}</p>
                </div>
              </div>

              {selectedUser.reports > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Reports: {selectedUser.reports}</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">This user has been reported for policy violations.</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button className="flex-1">Send Message</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Profile
                </Button>
                {selectedUser.status === "active" && (
                  <Button variant="destructive" onClick={() => handleUserAction(selectedUser.id, "suspend")}>
                    Suspend User
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
