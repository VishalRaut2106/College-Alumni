import Navigation from "@/components/navigation"
import SignupForm from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <SignupForm />
      </div>
    </div>
  )
}
