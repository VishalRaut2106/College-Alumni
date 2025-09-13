"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Plus, X, Upload } from "lucide-react"

export default function EditProfile() {
  const router = useRouter()

  // Mock user data - in real app this would come from API/database
  const [formData, setFormData] = useState({
    fullName: "Sarah Chen",
    bio: "Passionate computer science student interested in AI/ML and web development. Love contributing to open source projects and helping fellow students.",
    year: "2024",
    branch: "Computer Science",
    skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning", "Data Structures"],
    projects: [
      {
        name: "Student Portal App",
        description: "A full-stack web application for managing student activities",
        tech: ["React", "Node.js", "MongoDB"],
      },
      {
        name: "ML Recommendation System",
        description: "Machine learning model for course recommendations",
        tech: ["Python", "TensorFlow", "Pandas"],
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      portfolio: "https://sarahchen.dev",
    },
    privacy: {
      allowContactExchange: true,
      showEmail: true,
      showPhone: false,
    },
  })

  const [newSkill, setNewSkill] = useState("")
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    tech: [],
  })
  const [newTech, setNewTech] = useState("")

  const branches = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Business Administration",
    "Economics",
    "Other",
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePrivacyChange = (setting, checked) => {
    setFormData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: checked,
      },
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addTechToProject = () => {
    if (newTech.trim() && !newProject.tech.includes(newTech.trim())) {
      setNewProject((prev) => ({
        ...prev,
        tech: [...prev.tech, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechFromProject = (techToRemove) => {
    setNewProject((prev) => ({
      ...prev,
      tech: prev.tech.filter((tech) => tech !== techToRemove),
    }))
  }

  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject],
      }))
      setNewProject({ name: "", description: "", tech: [] })
    }
  }

  const removeProject = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    console.log("Profile update:", formData)
    router.push("/profile")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/professional-woman-diverse.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Button variant="outline" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select value={formData.branch} onValueChange={(value) => handleSelectChange("branch", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="links.linkedin"
                value={formData.links.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                name="links.github"
                value={formData.links.github}
                onChange={handleInputChange}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input
                id="portfolio"
                name="links.portfolio"
                value={formData.links.portfolio}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeProject(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Project */}
            <div className="p-4 border-2 border-dashed rounded-lg space-y-4">
              <h4 className="font-semibold">Add New Project</h4>
              <div className="space-y-2">
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Project name"
                />
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Project description"
                  rows={2}
                />
                <div className="flex flex-wrap gap-2 mb-2">
                  {newProject.tech.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechFromProject(tech)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechToProject())}
                  />
                  <Button type="button" onClick={addTechToProject}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button type="button" onClick={addProject} className="w-full">
                  Add Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowContactExchange"
                checked={formData.privacy.allowContactExchange}
                onCheckedChange={(checked) => handlePrivacyChange("allowContactExchange", checked)}
              />
              <Label htmlFor="allowContactExchange">Allow contact information exchange</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showEmail"
                checked={formData.privacy.showEmail}
                onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
              />
              <Label htmlFor="showEmail">Show email address on profile</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showPhone"
                checked={formData.privacy.showPhone}
                onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
              />
              <Label htmlFor="showPhone">Show phone number on profile</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
