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
} from "lucide-react"
import CalendarComponent from "../../components/calender"
import UpcomingMeetings from "./components/meetings"
import TaskStats from "./components/task"
import SkillProgress from "./components/skillProgress"
import { useSelector } from "react-redux"
import { LeaveRequest } from "./components/leaveRequest"

export default function EmployeeDashboard() {
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
            case 'leave':
                return <LeaveRequest onClose={closeModal} />;
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
                                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">Welcome, {user?.name}</h1>
                                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Your employee dashboard overview</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
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
                            {/* Profile Section */}
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
                                            <p className="text-muted-foreground text-sm sm:text-base">Senior Software Engineer</p>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                                                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    Team Lead
                                                </Badge>
                                                <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                                                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
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
                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-base sm:text-lg">Schedule Calendar</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="sm:p-6">
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
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">S</span>
                                            </div>
                                            <span className="text-sm">Slack</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">G</span>
                                            </div>
                                            <span className="text-sm whitespace-nowrap">Google Workspace</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">T</span>
                                            </div>
                                            <span className="text-sm">Trello</span>
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
                            {/* Upcoming Meetings */}
                            <UpcomingMeetings />

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Workflow className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Create Tasks</span>
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Log Time</span>
                                    </Button>
                                    <Button onClick={() => openModal('leave')} className="w-full justify-start bg-transparent" variant="outline">
                                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Request Leave</span>
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Team Directory</span>
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="truncate">Update Profile</span>
                                    </Button>
                                </CardContent>
                            </Card>
                            {/* Employee Development */}
                            <SkillProgress />

                        </div>
                    </div>
                </main>
            </div>
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {renderModal()}
                    </div>
                </div>
            )}
        </div>
    )
}
