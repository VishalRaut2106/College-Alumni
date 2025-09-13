"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Eye, Save } from "lucide-react"

export default function CreateBlog() {
  const router = useRouter()
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
  })
  const [newTag, setNewTag] = useState("")

  const categories = ["Technology", "Career", "Engineering", "Business", "Research", "Other"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Submit blog post to backend
    console.log("Blog post submitted:", formData)
    router.push("/blogs")
  }

  const handleSaveDraft = () => {
    // TODO: Save as draft
    console.log("Draft saved:", formData)
  }

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Write a New Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {!isPreview ? (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title for your post"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a brief summary that will appear in the blog list"
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground">{formData.excerpt.length}/200 characters</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags (max 5)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      disabled={formData.tags.length >= 5}
                    />
                    <Button type="button" onClick={addTag} disabled={formData.tags.length >= 5}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Write your post</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Share your knowledge, experiences, and insights with the community..."
                  rows={20}
                  required
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formData.content.split(/\s+/).length} words</span>
                  <span>Estimated read time: {estimateReadTime(formData.content)} min</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Writing Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use clear headings to structure your content</li>
                  <li>• Include code examples when relevant</li>
                  <li>• Add personal experiences and insights</li>
                  <li>• Keep paragraphs concise and readable</li>
                  <li>• Proofread before publishing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Publish Post
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        /* Preview Mode */
        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{formData.category || "Category"}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{estimateReadTime(formData.content)} min read</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-balance">{formData.title || "Your Post Title"}</h1>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">You</span>
                </div>
                <div>
                  <p className="font-medium">Your Name</p>
                  <p className="text-sm text-muted-foreground">Your Branch • Your Year</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {formData.excerpt && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-muted-foreground italic">{formData.excerpt}</p>
                  </div>
                )}
                <div className="prose prose-gray max-w-none">
                  <div style={{ whiteSpace: "pre-wrap" }}>{formData.content || "Your content will appear here..."}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => setIsPreview(false)} className="flex-1">
              Continue Editing
            </Button>
            <Button onClick={handleSubmit} variant="outline">
              Publish Post
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
