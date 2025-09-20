"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Progress } from "../../../components/ui/progress"
import { TrendingUp, Award, Target } from "lucide-react"

export default function SkillProgress() {
    const skills = [
        {
            name: "JavaScript",
            level: 92,
            trend: "up",
            category: "Technical",
        },
        {
            name: "Team Leadership",
            level: 78,
            trend: "up",
            category: "Soft Skills",
        },
        {
            name: "Project Management",
            level: 65,
            trend: "up",
            category: "Management",
        },
        {
            name: "React Development",
            level: 88,
            trend: "stable",
            category: "Technical",
        },
        {
            name: "Communication",
            level: 85,
            trend: "up",
            category: "Soft Skills",
        },
    ]

    const getCategoryColor = (category) => {
        switch (category) {
            case "Technical":
                return "bg-blue-100 text-blue-700"
            case "Soft Skills":
                return "bg-green-100 text-green-700"
            case "Management":
                return "bg-purple-100 text-purple-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Skill Development
                </CardTitle>
                <p className="text-sm text-muted-foreground">Track your professional growth</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{skill.name}</span>
                                {skill.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{skill.level}%</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(skill.category)}`}>
                                    {skill.category}
                                </span>
                            </div>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                    </div>
                ))}

                <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">Development Goals</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Complete Advanced React certification</li>
                        <li>• Improve public speaking skills</li>
                        <li>• Learn TypeScript fundamentals</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
