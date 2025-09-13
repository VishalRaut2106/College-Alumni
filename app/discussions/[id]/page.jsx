import Navigation from "@/components/navigation"
import ChatRoom from "@/components/discussions/chat-room"

export default function ChatRoomPage({ params }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ChatRoom roomId={params.id} />
      </div>
    </div>
  )
}
