"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  Flag,
} from "lucide-react"

export default function AdminDashboard() {
  // Mock admin data
  const [stats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    newUsersToday: 23,
    totalBlogs: 156,
    blogsToday: 8,
    totalRooms: 12,
    activeRooms: 9,
    pendingApprovals: 5,
    reportedContent: 3,
    systemHealth: 98,
  })

  const [recentActivity] = useState([
    {
      id: "1",
      type: "user_registration",
      description: "New user registered: John Smith (john.smith@college.edu)",
      timestamp: "2024-01-15T14:30:00Z",
      status: "pending",
    },
    {
      id: "2",
      type: "blog_published",
      description: "New blog post: 'Advanced React Patterns' by Sarah Chen",
      timestamp: "2024-01-15T13:45:00Z",
      status: "approved",
    },
    {
      id: "3",
      type: "room_request",
      description: "Room creation request: 'AI Ethics Discussion' by Alex Kumar",
      timestamp: "2024-01-15T12:20:00Z",
      status: "pending",
    },
    {
      id: "4",
      type: "content_report",
      description: "Content reported in 'CS 2024 Study Group' by Emma Wilson",
      timestamp: "2024-01-15T11:15:00Z",
      status: "investigating",
    },
    {
      id: "5",
      type: "user_approved",
      description: "Alumni verification approved: Dr. Maria Rodriguez",
      timestamp: "2024-01-15T10:30:00Z",
      status: "completed",
    },
  ])

  const [pendingApprovals] = useState([
    {
      id: "1",
      type: "alumni_verification",
      user: "Michael Johnson",
      email: "m.johnson@alumni.college.edu",
      graduationYear: "2019",
      linkedIn: "https://linkedin.com/in/michaeljohnson",
      timestamp: "2024-01-15T09:00:00Z",
    },
    {
      id: "2",
      type: "room_creation",
      requestedBy: "Alex Kumar",
      roomName: "AI Ethics Discussion",
      roomType: "interest-wise",
      description: "Discuss ethical implications of AI in modern society",
      timestamp: "2024-01-15T12:20:00Z",
    },
    {
      id: "3",
      type: "content_review",
      contentType: "blog",
      title: "Controversial Tech Opinions",
      author: "Anonymous User",
      reason: "Potentially inappropriate content",
      timestamp: "2024-01-15T08:45:00Z",
    },
  ])

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800"
      case "investigating":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "user_registration":
      case "user_approved":
        return <UserCheck className="w-4 h-4" />
      case "blog_published":
        return <BookOpen className="w-4 h-4" />
      case "room_request":
        return <MessageSquare className="w-4 h-4" />
      case "content_report":
        return <Flag className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your college community platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Administrator
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.newUsersToday}</span> today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.blogsToday}</span> today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Discussion Rooms</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRooms}</div>
            <p className="text-xs text-muted-foreground">{stats.activeRooms} active rooms</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Health</span>
                <span>{stats.systemHealth}%</span>
              </div>
              <Progress value={stats.systemHealth} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Server Status</p>
                <p className="font-medium text-green-600">Online</p>
              </div>
              <div>
                <p className="text-muted-foreground">Database</p>
                <p className="font-medium text-green-600">Healthy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">User Approvals</span>
              <Badge variant="secondary">{stats.pendingApprovals}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Reported Content</span>
              <Badge variant="destructive">{stats.reportedContent}</Badge>
            </div>
            <Button size="sm" className="w-full" asChild>
              <Link href="/admin/users">Review Pending</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
              <Link href="/admin/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
              <Link href="/admin/content">
                <BookOpen className="w-4 h-4 mr-2" />
                Content Moderation
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
              <Link href="/admin/rooms">
                <MessageSquare className="w-4 h-4 mr-2" />
                Room Management
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Pending Approvals */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</span>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {item.type.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatTime(item.timestamp)}</span>
                  </div>

                  {item.type === "alumni_verification" && (
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                      <p className="text-xs text-muted-foreground">Graduated: {item.graduationYear}</p>
                    </div>
                  )}

                  {item.type === "room_creation" && (
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{item.roomName}</p>
                      <p className="text-xs text-muted-foreground">Requested by: {item.requestedBy}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  )}

                  {item.type === "content_review" && (
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">By: {item.author}</p>
                      <p className="text-xs text-red-600">{item.reason}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
