"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Users, Video, Settings, ExternalLink, Clock, Shield, AlertTriangle } from "lucide-react"

export default function ChatRoom({ roomId }) {
  const router = useRouter()
  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState("")
  const [meetLink, setMeetLink] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isMeetDialogOpen, setIsMeetDialogOpen] = useState(false)

  // Mock room data
  const [room] = useState({
    id: roomId,
    name: "CS 2024 Study Group",
    description: "Study group for Computer Science students graduating in 2024",
    type: "year-wise",
    category: "Academic",
    memberCount: 45,
    onlineMembers: 12,
    isPrivate: false,
    currentMeetLink: "https://meet.google.com/abc-defg-hij",
    moderators: [
      {
        id: "1",
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        role: "moderator",
      },
    ],
    members: [
      {
        id: "1",
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        role: "moderator",
        isOnline: true,
      },
      {
        id: "2",
        name: "Alex Kumar",
        avatar: "/professional-man.png",
        role: "member",
        isOnline: true,
      },
      {
        id: "3",
        name: "Emma Wilson",
        avatar: "/professional-woman-diverse.png",
        role: "member",
        isOnline: false,
      },
      {
        id: "4",
        name: "David Park",
        avatar: "/professional-man.png",
        role: "member",
        isOnline: true,
      },
    ],
    isUserModerator: false, // In real app, this would be determined by user role
  })

  // Mock messages
  const [messages, setMessages] = useState([
    {
      id: "1",
      author: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        role: "moderator",
      },
      content: "Welcome everyone! Let's discuss our upcoming data structures exam.",
      timestamp: "2024-01-15T10:00:00Z",
      type: "message",
    },
    {
      id: "2",
      author: {
        id: "2",
        name: "Alex Kumar",
        avatar: "/professional-man.png",
        role: "member",
      },
      content: "Thanks Sarah! I'm struggling with binary trees. Anyone have good resources?",
      timestamp: "2024-01-15T10:02:00Z",
      type: "message",
    },
    {
      id: "3",
      author: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        role: "moderator",
      },
      content: "I've shared a Google Meet link for our study session: https://meet.google.com/abc-defg-hij",
      timestamp: "2024-01-15T10:05:00Z",
      type: "meet-link",
    },
    {
      id: "4",
      author: {
        id: "4",
        name: "David Park",
        avatar: "/professional-man.png",
        role: "member",
      },
      content: "Great! I'll join in 5 minutes. Also, check out this visualization tool for trees: https://visualgo.net",
      timestamp: "2024-01-15T10:07:00Z",
      type: "message",
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        author: {
          id: "current-user",
          name: "You",
          avatar: "/placeholder.svg",
          role: "member",
        },
        content: message,
        timestamp: new Date().toISOString(),
        type: "message",
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")
    }
  }

  const handleShareMeetLink = (e) => {
    e.preventDefault()
    if (meetLink.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        author: {
          id: "current-user",
          name: "You",
          avatar: "/placeholder.svg",
          role: "member",
        },
        content: `Meeting link shared: ${meetLink}`,
        timestamp: new Date().toISOString(),
        type: "meet-link",
      }
      setMessages((prev) => [...prev, newMessage])
      setMeetLink("")
      setIsMeetDialogOpen(false)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const onlineMembers = room.members.filter((member) => member.isOnline)

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
      {/* Main Chat Area */}
      <div className="lg:col-span-3 flex flex-col">
        {/* Chat Header */}
        <Card className="mb-4">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {room.type.replace("-", " ")}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{room.onlineMembers} online</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {room.currentMeetLink && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={room.currentMeetLink} target="_blank" rel="noopener noreferrer">
                      <Video className="w-4 h-4 mr-2" />
                      Join Meeting
                    </a>
                  </Button>
                )}
                <Dialog open={isMeetDialogOpen} onOpenChange={setIsMeetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Share Meet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share Meeting Link</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleShareMeetLink} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meetLink">Google Meet Link</Label>
                        <Input
                          id="meetLink"
                          value={meetLink}
                          onChange={(e) => setMeetLink(e.target.value)}
                          placeholder="https://meet.google.com/..."
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          Share Link
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsMeetDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                {room.isUserModerator && (
                  <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Messages Area */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={msg.author.avatar || "/placeholder.svg"} alt={msg.author.name} />
                  <AvatarFallback className="text-xs">{getInitials(msg.author.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{msg.author.name}</span>
                    {msg.author.role === "moderator" && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Mod
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div
                    className={`text-sm ${
                      msg.type === "meet-link" ? "bg-green-50 p-2 rounded-lg border border-green-200" : ""
                    }`}
                  >
                    {msg.type === "meet-link" && <Video className="w-4 h-4 inline mr-2 text-green-600" />}
                    {msg.content}
                    {msg.type === "meet-link" && msg.content.includes("http") && (
                      <Button variant="ghost" size="sm" className="ml-2 h-6 px-2" asChild>
                        <a href={msg.content.match(/https?:\/\/[^\s]+/)?.[0]} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Sidebar - Members */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Members ({room.memberCount})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Online Members */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Online ({onlineMembers.length})</h4>
              <div className="space-y-2">
                {onlineMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      {member.role === "moderator" && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Moderator
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Offline Members */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Offline ({room.members.filter((m) => !m.isOnline).length})
              </h4>
              <div className="space-y-2">
                {room.members
                  .filter((member) => !member.isOnline)
                  .slice(0, 5)
                  .map((member) => (
                    <div key={member.id} className="flex items-center gap-2 opacity-60">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{member.name}</p>
                        {member.role === "moderator" && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Moderator
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Room Info */}
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Room Info</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>{room.description}</p>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Created Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Anti-abuse Notice */}
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-xs text-yellow-800">
                  <p className="font-medium">Community Guidelines</p>
                  <p>Real names are visible. Be respectful and follow community guidelines.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
