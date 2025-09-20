"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Progress } from "../../../components/ui/progress"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function TaskStats() {
    const taskData = [
        {
            title: "Completed Tasks",
            value: 24,
            total: 30,
            percentage: 80,
            color: "bg-green-500",
            icon: CheckCircle,
            trend: "+12% from last week",
        },
        {
            title: "In Progress",
            value: 4,
            total: 30,
            percentage: 13,
            color: "bg-blue-500",
            icon: Clock,
            trend: "2 due today",
        },
        {
            title: "Pending Review",
            value: 2,
            total: 30,
            percentage: 7,
            color: "bg-orange-500",
            icon: AlertTriangle,
            trend: "1 overdue",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Task Completion Overview */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Task Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">Your current work progress</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {taskData.map((task, index) => {
                            const Icon = task.icon
                            return (
                                <div key={index} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg ${task.color} flex items-center justify-center`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-2xl text-foreground">{task.value}</h3>
                                            <p className="text-sm text-muted-foreground">{task.title}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{task.percentage}%</span>
                                        </div>
                                        <Progress value={task.percentage} className="h-2" />
                                        <p className="text-xs text-muted-foreground">{task.trend}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
