"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Search,
  Flag,
  Eye,
  Trash2,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Clock,
} from "lucide-react"

export default function ContentModeration() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedContent, setSelectedContent] = useState(null)
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false)
  const [moderationNote, setModerationNote] = useState("")

  // Mock reported content data
  const [reportedContent] = useState([
    {
      id: "1",
      type: "blog",
      title: "Controversial Tech Opinions",
      content: "This is a sample blog post content that has been reported for potentially inappropriate content...",
      author: {
        id: "5",
        name: "Emma Wilson",
        avatar: "/professional-woman-diverse.png",
      },
      reportedBy: {
        id: "2",
        name: "Alex Kumar",
        avatar: "/professional-man.png",
      },
      reason: "Inappropriate content",
      description: "Contains offensive language and controversial statements",
      reportedAt: "2024-01-15T08:45:00Z",
      status: "pending",
      severity: "medium",
      category: "Technology",
    },
    {
      id: "2",
      type: "message",
      title: "Discussion Room Message",
      content: "This is a message from a discussion room that was reported for spam...",
      author: {
        id: "4",
        name: "David Park",
        avatar: "/professional-man.png",
      },
      reportedBy: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
      },
      reason: "Spam",
      description: "Repeated promotional messages in study group",
      reportedAt: "2024-01-15T11:15:00Z",
      status: "investigating",
      severity: "low",
      roomName: "CS 2024 Study Group",
    },
    {
      id: "3",
      type: "blog",
      title: "Plagiarized Research Paper",
      content: "This blog post appears to contain plagiarized content from academic sources...",
      author: {
        id: "6",
        name: "Anonymous User",
        avatar: null,
      },
      reportedBy: {
        id: "3",
        name: "Dr. Maria Rodriguez",
        avatar: "/professional-woman-professor.png",
      },
      reason: "Plagiarism",
      description: "Content copied from published research without attribution",
      reportedAt: "2024-01-14T16:30:00Z",
      status: "resolved",
      severity: "high",
      category: "Research",
      resolution: "Content removed and user warned",
    },
  ])

  const filteredContent = reportedContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || content.type === filterType
    const matchesStatus = filterStatus === "all" || content.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
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
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "dismissed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getContentIcon = (type) => {
    switch (type) {
      case "blog":
        return <BookOpen className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      default:
        return <Flag className="w-4 h-4" />
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleContentAction = (contentId, action, note = "") => {
    // TODO: Implement content moderation actions
    console.log(`${action} content:`, contentId, note)
    setIsContentDialogOpen(false)
    setModerationNote("")
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
            <h1 className="text-2xl font-bold">Content Moderation</h1>
            <p className="text-muted-foreground">Review and moderate reported content</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{reportedContent.filter((c) => c.status === "pending").length}</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {reportedContent.filter((c) => c.status === "investigating").length}
            </div>
            <p className="text-sm text-muted-foreground">Under Investigation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{reportedContent.filter((c) => c.severity === "high").length}</div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{reportedContent.filter((c) => c.status === "resolved").length}</div>
            <p className="text-sm text-muted-foreground">Resolved</p>
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
                placeholder="Search by title, author, or reason..."
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
                  <SelectItem value="blog">Blog Posts</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reported Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Reported Content ({filteredContent.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContent.map((content) => (
              <div key={content.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getContentIcon(content.type)}</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{content.title}</h3>
                        <Badge className={getSeverityColor(content.severity)}>{content.severity} priority</Badge>
                        <Badge className={getStatusColor(content.status)}>{content.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{content.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={content.author.avatar || "/placeholder.svg"} alt={content.author.name} />
                            <AvatarFallback className="text-xs">{getInitials(content.author.name)}</AvatarFallback>
                          </Avatar>
                          <span>By {content.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(content.reportedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedContent(content)
                        setIsContentDialogOpen(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-start gap-2">
                    <Flag className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-red-800">Reported for: {content.reason}</span>
                        <Avatar className="w-5 h-5">
                          <AvatarImage
                            src={content.reportedBy.avatar || "/placeholder.svg"}
                            alt={content.reportedBy.name}
                          />
                          <AvatarFallback className="text-xs">{getInitials(content.reportedBy.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-red-700">by {content.reportedBy.name}</span>
                      </div>
                      <p className="text-sm text-red-700">{content.description}</p>
                      {content.roomName && <p className="text-xs text-red-600">Room: {content.roomName}</p>}
                    </div>
                  </div>
                </div>

                {content.status === "resolved" && content.resolution && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-medium text-green-800">Resolution: </span>
                        <span className="text-green-700">{content.resolution}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Review Dialog */}
      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Content Review</DialogTitle>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {getContentIcon(selectedContent.type)}
                <h3 className="text-xl font-semibold">{selectedContent.title}</h3>
                <Badge className={getSeverityColor(selectedContent.severity)}>{selectedContent.severity}</Badge>
                <Badge className={getStatusColor(selectedContent.status)}>{selectedContent.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium">Author</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={selectedContent.author.avatar || "/placeholder.svg"}
                        alt={selectedContent.author.name}
                      />
                      <AvatarFallback className="text-xs">{getInitials(selectedContent.author.name)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedContent.author.name}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Reported By</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={selectedContent.reportedBy.avatar || "/placeholder.svg"}
                        alt={selectedContent.reportedBy.name}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(selectedContent.reportedBy.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedContent.reportedBy.name}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Report Details</Label>
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-medium text-red-800">Reason: {selectedContent.reason}</p>
                  <p className="text-sm text-red-700 mt-1">{selectedContent.description}</p>
                  <p className="text-xs text-red-600 mt-2">Reported on {formatDate(selectedContent.reportedAt)}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Content</Label>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg max-h-60 overflow-y-auto">
                  <p className="text-sm">{selectedContent.content}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="moderationNote">Moderation Note</Label>
                <Textarea
                  id="moderationNote"
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                  placeholder="Add a note about your decision..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handleContentAction(selectedContent.id, "approve", moderationNote)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Content
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleContentAction(selectedContent.id, "warn", moderationNote)}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Warn Author
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleContentAction(selectedContent.id, "remove", moderationNote)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Content
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
