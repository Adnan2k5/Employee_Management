import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import {
    TrendingUp,
    TrendingDown,
    Users,
    CheckCircle,
    Clock,
    AlertTriangle,
    BarChart3
} from "lucide-react"

export default function TeamAnalytics() {
    const analytics = {
        totalEmployees: 15,
        activeProjects: 8,
        completedTasks: 142,
        pendingTasks: 28,
        productivity: 92,
        satisfaction: 4.6,
        attendance: 95,
        onTimeDelivery: 87
    }

    const departmentStats = [
        { name: "Engineering", employees: 8, productivity: 94, color: "bg-blue-500" },
        { name: "Design", employees: 3, productivity: 89, color: "bg-purple-500" },
        { name: "QA", employees: 2, productivity: 91, color: "bg-green-500" },
        { name: "DevOps", employees: 2, productivity: 96, color: "bg-orange-500" }
    ]

    const recentMetrics = [
        { metric: "Team Productivity", value: "92%", change: "+5%", trend: "up" },
        { metric: "Project Completion", value: "87%", change: "+3%", trend: "up" },
        { metric: "Employee Satisfaction", value: "4.6/5", change: "+0.2", trend: "up" },
        { metric: "Bug Resolution Time", value: "2.3 days", change: "-0.5", trend: "up" }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg">Team Analytics</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-chart-1" />
                            <span className="text-sm font-medium">Team Size</span>
                        </div>
                        <p className="text-2xl font-bold">{analytics.totalEmployees}</p>
                        <p className="text-xs text-muted-foreground">Active employees</p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                        <p className="text-2xl font-bold">{analytics.completedTasks}</p>
                        <p className="text-xs text-muted-foreground">Tasks this month</p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium">Pending</span>
                        </div>
                        <p className="text-2xl font-bold">{analytics.pendingTasks}</p>
                        <p className="text-xs text-muted-foreground">Active tasks</p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-chart-2" />
                            <span className="text-sm font-medium">Productivity</span>
                        </div>
                        <p className="text-2xl font-bold">{analytics.productivity}%</p>
                        <p className="text-xs text-muted-foreground">This quarter</p>
                    </div>
                </div>

                {/* Department Performance */}
                <div>
                    <h4 className="font-semibold mb-3">Department Performance</h4>
                    <div className="space-y-3">
                        {departmentStats.map((dept, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                                    <div>
                                        <p className="font-medium">{dept.name}</p>
                                        <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{dept.productivity}%</p>
                                    <p className="text-xs text-muted-foreground">Productivity</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Metrics */}
                <div>
                    <h4 className="font-semibold mb-3">Performance Trends</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {recentMetrics.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="text-sm font-medium">{item.metric}</p>
                                    <p className="text-lg font-bold">{item.value}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {item.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-600" />
                                    )}
                                    <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {item.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button variant="outline" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Detailed Analytics
                </Button>
            </CardContent>
        </Card>
    )
}