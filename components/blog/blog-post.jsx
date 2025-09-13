"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Star,
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  Edit,
  Trash2,
} from "lucide-react"

export default function BlogPost({ blogId }) {
  const router = useRouter()
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock blog data - in real app this would be fetched based on blogId
  const [blog] = useState({
    id: blogId,
    title: "Getting Started with Machine Learning in Python",
    content: `
# Introduction

Machine Learning has become one of the most exciting and rapidly growing fields in technology. As a computer science student, I've been fascinated by the potential of ML to solve complex problems and create intelligent systems.

In this comprehensive guide, I'll walk you through the fundamentals of machine learning and show you how to implement your first ML model using Python and scikit-learn.

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence (AI) that enables computers to learn and make decisions from data without being explicitly programmed for every scenario. Instead of following pre-programmed instructions, ML algorithms build mathematical models based on training data to make predictions or decisions.

### Types of Machine Learning

There are three main types of machine learning:

1. **Supervised Learning**: Learning with labeled examples
2. **Unsupervised Learning**: Finding patterns in data without labels
3. **Reinforcement Learning**: Learning through interaction and feedback

## Getting Started with Python

Python is the most popular language for machine learning due to its simplicity and powerful libraries. Here are the essential libraries you'll need:

- **NumPy**: For numerical computations
- **Pandas**: For data manipulation and analysis
- **Matplotlib/Seaborn**: For data visualization
- **Scikit-learn**: For machine learning algorithms

## Your First ML Model

Let's build a simple linear regression model to predict house prices:

\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Load your data
data = pd.read_csv('house_prices.csv')

# Prepare features and target
X = data[['size', 'bedrooms', 'age']]
y = data['price']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')
\`\`\`

## Best Practices

1. **Data Quality**: Always clean and preprocess your data
2. **Feature Engineering**: Create meaningful features from raw data
3. **Model Validation**: Use cross-validation to assess model performance
4. **Avoid Overfitting**: Use techniques like regularization

## Conclusion

Machine learning is a powerful tool that can help solve real-world problems. Start with simple projects and gradually work your way up to more complex challenges. Remember, the key to success in ML is practice and continuous learning.

Happy coding!
    `,
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "/professional-woman-diverse.png",
      year: "2024",
      branch: "Computer Science",
      bio: "Passionate about AI/ML and web development",
    },
    category: "Technology",
    tags: ["Machine Learning", "Python", "Data Science", "Tutorial"],
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    readTime: 8,
    rating: {
      average: 4.8,
      count: 24,
      userRating: null,
    },
    views: 156,
    likes: 42,
    comments: [
      {
        id: "1",
        author: {
          name: "Alex Kumar",
          avatar: "/professional-man.png",
        },
        content: "Great introduction to ML! The code examples are really helpful.",
        publishedAt: "2024-01-15T14:30:00Z",
        likes: 5,
      },
      {
        id: "2",
        author: {
          name: "Emma Wilson",
          avatar: "/professional-woman-diverse.png",
        },
        content: "This helped me understand the basics. Looking forward to more posts like this!",
        publishedAt: "2024-01-16T09:15:00Z",
        likes: 3,
      },
    ],
    isAuthor: false, // In real app, this would be determined by comparing current user with author
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleRating = (rating) => {
    setUserRating(rating)
    // TODO: Submit rating to backend
    console.log("Rating submitted:", rating)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // TODO: Show toast notification
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Submit bookmark to backend
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    // TODO: Submit like to backend
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      // TODO: Submit comment to backend
      console.log("Comment submitted:", comment)
      setComment("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blogs
      </Button>

      {/* Blog Header */}
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{blog.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{blog.views} views</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-balance">{blog.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                <AvatarFallback>{getInitials(blog.author.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  <Link href={`/profile/${blog.author.id}`} className="hover:text-primary">
                    {blog.author.name}
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  {blog.author.branch} • {blog.author.year}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Published {formatDate(blog.publishedAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {blog.isAuthor && (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blogs/${blog.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? "bg-primary/10" : ""}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-primary" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Blog Content */}
      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }} />
          </div>
        </CardContent>
      </Card>

      {/* Rating Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rate this post</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || userRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Average: {blog.rating.average} ({blog.rating.count} ratings)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleLike} className={isLiked ? "bg-primary/10" : ""}>
                <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? "fill-primary" : ""}`} />
                {blog.likes + (isLiked ? 1 : 0)} Likes
              </Button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>{blog.comments.length} Comments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Comments ({blog.comments.length})</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button type="submit" disabled={!comment.trim()}>
              Post Comment
            </Button>
          </form>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            {blog.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{comment.author.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(comment.publishedAt)}</p>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {blog.comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
