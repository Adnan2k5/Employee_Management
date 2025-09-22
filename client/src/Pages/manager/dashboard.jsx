import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import {
    Calendar,
    Clock,
    Settings,
    Users,
    CheckCircle,
    AlertCircle,
    MoreHorizontal,
    Workflow,
    UserCheck,
    UserX,
    TrendingUp,
    BarChart3,
    FileText,
    Video,
    PlusCircle,
    Search,
    Bell
} from "lucide-react"
import CalendarComponent from "../../components/calender"
import { useSelector } from "react-redux"
import MeetingScheduler from "./components/MeetingScheduler"
import LeaveApproval from "./components/LeaveApproval"
import EmployeeManagement from "./components/EmployeeManagement"
import TeamAnalytics from "./components/TeamAnalytics"
import ProjectOverview from "./components/ProjectOverview"
import PerformanceTracker from "./components/PerformanceTracker"

export default function ManagerDashboard() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const { user } = useSelector((state) => state.user);
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modal) => {
        setActiveModal(modal);
    }

    const closeModal = () => {
        setActiveModal(null);
    }

    const renderModal = () => {
        switch (activeModal) {
            case 'meeting':
                return <MeetingScheduler onClose={closeModal} />;
            case 'leave-approval':
                return <LeaveApproval onClose={closeModal} />;
            case 'employee-management':
                return <EmployeeManagement onClose={closeModal} />;
            case 'performance':
                return <PerformanceTracker onClose={closeModal} />;
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">Manager Dashboard</h1>
                                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Team management and oversight</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
                        </Button>
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                            <AvatarImage src="/professional-woman-diverse.png" alt={user?.name} />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <div className="flex flex-col">
                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Column */}
                        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
                            {/* Manager Profile Section */}
                            <Card>
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="relative flex-shrink-0">
                                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                                                <AvatarImage src="/professional-woman-diverse.png" alt={user?.name} />
                                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground truncate">{user?.name}</h2>
                                            <p className="text-muted-foreground text-sm sm:text-base">IT Department Manager</p>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                                                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    Team Manager
                                                </Badge>
                                                <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                                                    15 Direct Reports
                                                </Badge>
                                                <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                                                    IT Department
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Team Analytics */}
                            <TeamAnalytics />

                            {/* Project Overview */}
                            <ProjectOverview />

                            {/* Calendar Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-base sm:text-lg">Team Calendar & Events</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="sm:p-6">
                                    <CalendarComponent selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                                </CardContent>
                            </Card>

                            {/* Management Tools */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Management Tools</CardTitle>
                                    <p className="text-sm text-muted-foreground">Integrated management solutions</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">J</span>
                                            </div>
                                            <span className="text-sm">JIRA</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">S</span>
                                            </div>
                                            <span className="text-sm whitespace-nowrap">Slack</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">G</span>
                                            </div>
                                            <span className="text-sm">GitHub</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">A</span>
                                            </div>
                                            <span className="text-sm">Azure DevOps</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manager Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button
                                        onClick={() => openModal('meeting')}
                                        className="w-full justify-start bg-transparent"
                                        variant="outline"
                                    >
                                        <Video className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Schedule Meeting</span>
                                    </Button>
                                    <Button
                                        onClick={() => openModal('leave-approval')}
                                        className="w-full justify-start bg-transparent"
                                        variant="outline"
                                    >
                                        <UserCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Review Leave Requests</span>
                                    </Button>
                                    <Button
                                        onClick={() => openModal('employee-management')}
                                        className="w-full justify-start bg-transparent"
                                        variant="outline"
                                    >
                                        <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Manage Employees</span>
                                    </Button>
                                    <Button
                                        onClick={() => openModal('performance')}
                                        className="w-full justify-start bg-transparent"
                                        variant="outline"
                                    >
                                        <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Performance Reviews</span>
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Generate Reports</span>
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Team Settings</span>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Pending Approvals */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Pending Approvals</span>
                                        <Badge variant="destructive">5</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">John Doe</p>
                                                <p className="text-xs text-muted-foreground">Leave Request</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                <UserCheck className="w-3 h-3 text-green-600" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                <UserX className="w-3 h-3 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>SM</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">Sarah Miller</p>
                                                <p className="text-xs text-muted-foreground">Time Off Request</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                <UserCheck className="w-3 h-3 text-green-600" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                <UserX className="w-3 h-3 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
                                        View All Requests
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Team Performance */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Performance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Overall Productivity</span>
                                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                92%
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Project Completion</span>
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                                87%
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Team Satisfaction</span>
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                                94%
                                            </Badge>
                                        </div>
                                        <Button variant="outline" className="w-full">
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            View Detailed Analytics
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>

            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {renderModal()}
                    </div>
                </div>
            )}
        </div>
    )
}