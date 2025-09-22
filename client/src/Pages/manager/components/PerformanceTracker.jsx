import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import {
    TrendingUp,
    Star,
    Target,
    Award,
    Calendar,
    FileText,
    X,
    Search,
    Plus,
    Edit,
    CheckCircle,
    AlertTriangle
} from "lucide-react"

export default function PerformanceTracker({ onClose }) {
    const [activeTab, setActiveTab] = useState('overview')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    // Mock performance data
    const performanceData = [
        {
            id: 1,
            employeeName: "John Doe",
            avatar: "JD",
            role: "Senior Developer",
            department: "Engineering",
            currentRating: 4.8,
            previousRating: 4.6,
            lastReview: "2023-12-01",
            nextReview: "2024-06-01",
            goals: [
                { title: "Complete API Documentation", status: "completed", progress: 100 },
                { title: "Mentor Junior Developers", status: "in-progress", progress: 75 },
                { title: "Learn Microservices Architecture", status: "in-progress", progress: 60 }
            ],
            metrics: {
                productivity: 92,
                quality: 95,
                collaboration: 88,
                innovation: 90
            },
            feedback: "Excellent technical skills and leadership qualities. Shows great initiative in mentoring team members.",
            improvementAreas: ["Time management", "Delegation skills"]
        },
        {
            id: 2,
            employeeName: "Sarah Miller",
            avatar: "SM",
            role: "UI/UX Designer",
            department: "Design",
            currentRating: 4.6,
            previousRating: 4.4,
            lastReview: "2023-11-15",
            nextReview: "2024-05-15",
            goals: [
                { title: "Redesign Mobile Interface", status: "completed", progress: 100 },
                { title: "User Research Study", status: "in-progress", progress: 80 },
                { title: "Design System Documentation", status: "planning", progress: 20 }
            ],
            metrics: {
                productivity: 89,
                quality: 92,
                collaboration: 94,
                innovation: 96
            },
            feedback: "Creative and user-focused approach. Excellent collaboration with development team.",
            improvementAreas: ["Technical skills", "Project timeline management"]
        },
        {
            id: 3,
            employeeName: "Mike Johnson",
            avatar: "MJ",
            role: "DevOps Engineer",
            department: "Engineering",
            currentRating: 4.4,
            previousRating: 4.2,
            lastReview: "2023-10-30",
            nextReview: "2024-04-30",
            goals: [
                { title: "Implement CI/CD Pipeline", status: "completed", progress: 100 },
                { title: "Container Orchestration Setup", status: "in-progress", progress: 70 },
                { title: "Security Audit", status: "planning", progress: 10 }
            ],
            metrics: {
                productivity: 87,
                quality: 91,
                collaboration: 85,
                innovation: 88
            },
            feedback: "Strong technical expertise in infrastructure. Reliable and consistent performer.",
            improvementAreas: ["Communication skills", "Knowledge sharing"]
        }
    ]

    const getPerformanceStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ))
    }

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500'
        if (progress >= 60) return 'bg-blue-500'
        if (progress >= 40) return 'bg-orange-500'
        return 'bg-red-500'
    }

    const getGoalStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800'
            case 'in-progress': return 'bg-blue-100 text-blue-800'
            case 'planning': return 'bg-yellow-100 text-yellow-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredPerformanceData = performanceData.filter(emp =>
        emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const overallStats = {
        averageRating: (performanceData.reduce((sum, emp) => sum + emp.currentRating, 0) / performanceData.length).toFixed(1),
        topPerformers: performanceData.filter(emp => emp.currentRating >= 4.5).length,
        improvementNeeded: performanceData.filter(emp => emp.currentRating < 4.0).length,
        totalGoals: performanceData.reduce((sum, emp) => sum + emp.goals.length, 0),
        completedGoals: performanceData.reduce((sum, emp) => sum + emp.goals.filter(goal => goal.status === 'completed').length, 0)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Performance Tracker
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mt-4">
                    <Button
                        variant={activeTab === 'overview' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('overview')}
                        className="flex-1"
                    >
                        Overview
                    </Button>
                    <Button
                        variant={activeTab === 'individual' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('individual')}
                        className="flex-1"
                    >
                        Individual Reviews
                    </Button>
                    <Button
                        variant={activeTab === 'goals' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('goals')}
                        className="flex-1"
                    >
                        Goals & KPIs
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Performance Statistics */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-medium">Avg Rating</span>
                                </div>
                                <p className="text-2xl font-bold">{overallStats.averageRating}</p>
                                <p className="text-xs text-muted-foreground">Out of 5.0</p>
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium">Top Performers</span>
                                </div>
                                <p className="text-2xl font-bold">{overallStats.topPerformers}</p>
                                <p className="text-xs text-muted-foreground">Rating 4.5+</p>
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium">Need Support</span>
                                </div>
                                <p className="text-2xl font-bold">{overallStats.improvementNeeded}</p>
                                <p className="text-xs text-muted-foreground">Rating below 4.0</p>
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium">Total Goals</span>
                                </div>
                                <p className="text-2xl font-bold">{overallStats.totalGoals}</p>
                                <p className="text-xs text-muted-foreground">Active goals</p>
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium">Completed</span>
                                </div>
                                <p className="text-2xl font-bold">{overallStats.completedGoals}</p>
                                <p className="text-xs text-muted-foreground">Goals achieved</p>
                            </div>
                        </div>

                        {/* Team Performance Summary */}
                        <div>
                            <h4 className="font-semibold mb-3">Team Performance Summary</h4>
                            <div className="space-y-3">
                                {performanceData.map(employee => (
                                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarFallback>{employee.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{employee.employeeName}</p>
                                                <p className="text-sm text-muted-foreground">{employee.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    {getPerformanceStars(employee.currentRating)}
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {employee.currentRating}/5.0
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {employee.currentRating > employee.previousRating ? (
                                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <TrendingUp className="w-4 h-4 text-gray-400 rotate-180" />
                                                )}
                                                <span className={`text-sm ${employee.currentRating > employee.previousRating
                                                        ? 'text-green-600' : 'text-gray-600'
                                                    }`}>
                                                    {employee.currentRating > employee.previousRating ? '+' : ''}
                                                    {(employee.currentRating - employee.previousRating).toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'individual' && (
                    <div className="space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Employee Performance Cards */}
                        <div className="space-y-4">
                            {filteredPerformanceData.map(employee => (
                                <Card key={employee.id} className="p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-12 h-12">
                                                <AvatarFallback>{employee.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{employee.employeeName}</h4>
                                                <p className="text-sm text-muted-foreground">{employee.role} • {employee.department}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedEmployee(employee)}
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            View Details
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Current Rating</p>
                                            <div className="flex items-center gap-2">
                                                {getPerformanceStars(employee.currentRating)}
                                                <span className="font-medium">{employee.currentRating}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Last Review</p>
                                            <p className="font-medium">{employee.lastReview}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Next Review</p>
                                            <p className="font-medium">{employee.nextReview}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Goals Progress</p>
                                            <p className="font-medium">
                                                {employee.goals.filter(g => g.status === 'completed').length}/{employee.goals.length}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Productivity</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${employee.metrics.productivity}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{employee.metrics.productivity}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Quality</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-green-500 h-2 rounded-full"
                                                        style={{ width: `${employee.metrics.quality}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{employee.metrics.quality}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Collaboration</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-purple-500 h-2 rounded-full"
                                                        style={{ width: `${employee.metrics.collaboration}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{employee.metrics.collaboration}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Innovation</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-orange-500 h-2 rounded-full"
                                                        style={{ width: `${employee.metrics.innovation}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{employee.metrics.innovation}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'goals' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Team Goals & KPIs</h3>
                            <Button variant="outline" size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Set Goal
                            </Button>
                        </div>

                        {/* Goals by Employee */}
                        <div className="space-y-4">
                            {performanceData.map(employee => (
                                <Card key={employee.id} className="p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar className="w-10 h-10">
                                            <AvatarFallback>{employee.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold">{employee.employeeName}</h4>
                                            <p className="text-sm text-muted-foreground">{employee.role}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {employee.goals.map((goal, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <p className="font-medium">{goal.title}</p>
                                                        <Badge className={getGoalStatusColor(goal.status)}>
                                                            {goal.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                                                            <div
                                                                className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                                                                style={{ width: `${goal.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium">{goal.progress}%</span>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>

            {/* Employee Detail Modal */}
            {selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Performance Review Details</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedEmployee(null)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Employee Info */}
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarFallback className="text-lg">{selectedEmployee.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedEmployee.employeeName}</h3>
                                    <p className="text-muted-foreground">{selectedEmployee.role} • {selectedEmployee.department}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        {getPerformanceStars(selectedEmployee.currentRating)}
                                        <span className="font-medium">{selectedEmployee.currentRating}/5.0</span>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Metrics */}
                            <div>
                                <h4 className="font-semibold mb-3">Performance Metrics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(selectedEmployee.metrics).map(([key, value]) => (
                                        <div key={key} className="p-3 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground capitalize">{key}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex-1 bg-white rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${value}%` }}
                                                    ></div>
                                                </div>
                                                <span className="font-medium">{value}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Goals */}
                            <div>
                                <h4 className="font-semibold mb-3">Goals & Objectives</h4>
                                <div className="space-y-3">
                                    {selectedEmployee.goals.map((goal, index) => (
                                        <div key={index} className="p-3 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-medium">{goal.title}</p>
                                                <Badge className={getGoalStatusColor(goal.status)}>
                                                    {goal.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                                                        style={{ width: `${goal.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{goal.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Feedback */}
                            <div>
                                <h4 className="font-semibold mb-3">Manager Feedback</h4>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm">{selectedEmployee.feedback}</p>
                                </div>
                            </div>

                            {/* Improvement Areas */}
                            <div>
                                <h4 className="font-semibold mb-3">Areas for Improvement</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEmployee.improvementAreas.map((area, index) => (
                                        <Badge key={index} variant="outline">
                                            {area}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Button className="flex-1">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Review
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Schedule Meeting
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Card>
    )
}