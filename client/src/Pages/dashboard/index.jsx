"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import {
    Calendar,
    Clock,
    Search,
    Bell,
    Settings,
    Users,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    MoreHorizontal,
} from "lucide-react"
import CalendarComponent from "../../components/calender"
import UpcomingMeetings from "./components/meetings"
import TaskStats from "./components/task"
import SkillProgress from "./components/skillProgress"

export default function EmployeeDashboard() {
    const [selectedDate, setSelectedDate] = useState(new Date())

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-foreground">Welcome, Employee</h1>
                                <p className="text-sm text-muted-foreground">Your employee dashboard overview</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="/professional-woman-diverse.png" alt="Sarah" />
                            <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Section */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <Avatar className="w-20 h-20">
                                                <AvatarImage src="/professional-woman-diverse.png" alt="Sarah Wilson" />
                                                <AvatarFallback>SW</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-3 h-3 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-semibold text-foreground">Employee</h2>
                                            <p className="text-muted-foreground">Senior Software Engineer</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    Team Lead
                                                </Badge>
                                                <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    Full-time
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Task Statistics */}
                            <TaskStats />

                            {/* Calendar Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Schedule Calendar
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CalendarComponent selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                                </CardContent>
                            </Card>

                            {/* Work Connections */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Work Connections</CardTitle>
                                    <p className="text-sm text-muted-foreground">5 active integrations</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">S</span>
                                            </div>
                                            <span className="text-sm">Slack</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">G</span>
                                            </div>
                                            <span className="text-sm">Google Workspace</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">T</span>
                                            </div>
                                            <span className="text-sm">Trello</span>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Upcoming Meetings */}
                            <UpcomingMeetings />

                            {/* Employee Development */}
                            <SkillProgress />

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Log Time
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        Request Leave
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Users className="w-4 h-4 mr-2" />
                                        Team Directory
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Update Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
