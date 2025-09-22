import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import {
    Folder,
    Calendar,
    Users,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    Target,
    MoreHorizontal
} from "lucide-react"

export default function ProjectOverview() {
    const projects = [
        {
            id: 1,
            name: "Project Alpha",
            description: "Customer portal redesign",
            status: "in-progress",
            priority: "high",
            progress: 75,
            startDate: "2024-01-01",
            deadline: "2024-02-15",
            team: ["JD", "SM", "AB"],
            tasksCompleted: 24,
            totalTasks: 32,
            budget: "$85,000",
            spent: "$63,750"
        },
        {
            id: 2,
            name: "API Development",
            description: "REST API for mobile app",
            status: "in-progress",
            priority: "medium",
            progress: 60,
            startDate: "2023-12-15",
            deadline: "2024-01-30",
            team: ["DW", "MJ"],
            tasksCompleted: 18,
            totalTasks: 30,
            budget: "$45,000",
            spent: "$27,000"
        },
        {
            id: 3,
            name: "Infrastructure Setup",
            description: "Cloud migration and setup",
            status: "planning",
            priority: "high",
            progress: 25,
            startDate: "2024-01-15",
            deadline: "2024-03-01",
            team: ["MJ", "DW", "AB"],
            tasksCompleted: 5,
            totalTasks: 20,
            budget: "$120,000",
            spent: "$30,000"
        },
        {
            id: 4,
            name: "UI Redesign",
            description: "Modern UI/UX implementation",
            status: "completed",
            priority: "medium",
            progress: 100,
            startDate: "2023-11-01",
            deadline: "2023-12-31",
            team: ["SM", "ED"],
            tasksCompleted: 25,
            totalTasks: 25,
            budget: "$35,000",
            spent: "$34,200"
        }
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800'
            case 'in-progress': return 'bg-blue-100 text-blue-800'
            case 'planning': return 'bg-yellow-100 text-yellow-800'
            case 'on-hold': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800'
            case 'medium': return 'bg-orange-100 text-orange-800'
            case 'low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500'
        if (progress >= 60) return 'bg-blue-500'
        if (progress >= 40) return 'bg-orange-500'
        return 'bg-red-500'
    }

    const isOverdue = (deadline, status) => {
        const today = new Date()
        const deadlineDate = new Date(deadline)
        return deadlineDate < today && status !== 'completed'
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Folder className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-base sm:text-lg">Project Overview</span>
                    </CardTitle>
                    <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-2" />
                        New Project
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Project Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <Folder className="w-4 h-4 text-chart-1" />
                            <span className="text-sm font-medium">Active</span>
                        </div>
                        <p className="text-xl font-bold">{projects.filter(p => p.status === 'in-progress').length}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                        <p className="text-xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium">Planning</span>
                        </div>
                        <p className="text-xl font-bold">{projects.filter(p => p.status === 'planning').length}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium">Overdue</span>
                        </div>
                        <p className="text-xl font-bold">
                            {projects.filter(p => isOverdue(p.deadline, p.status)).length}
                        </p>
                    </div>
                </div>

                {/* Project List */}
                <div className="space-y-4">
                    {projects.map(project => (
                        <Card key={project.id} className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">{project.name}</h4>
                                        <Badge className={getStatusColor(project.status)}>
                                            {project.status}
                                        </Badge>
                                        <Badge className={getPriorityColor(project.priority)}>
                                            {project.priority}
                                        </Badge>
                                        {isOverdue(project.deadline, project.status) && (
                                            <Badge variant="destructive">Overdue</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Progress</span>
                                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Timeline</p>
                                    <p className="font-medium">{project.startDate} to {project.deadline}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Tasks</p>
                                    <p className="font-medium">{project.tasksCompleted}/{project.totalTasks} completed</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Budget</p>
                                    <p className="font-medium">{project.spent} / {project.budget}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Team</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {project.team.map((member, index) => (
                                            <Avatar key={index} className="w-6 h-6">
                                                <AvatarFallback className="text-xs">{member}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        <span className="text-xs text-muted-foreground ml-1">
                                            +{project.team.length} members
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Button variant="outline" className="w-full">
                    <Folder className="w-4 h-4 mr-2" />
                    View All Projects
                </Button>
            </CardContent>
        </Card>
    )
}