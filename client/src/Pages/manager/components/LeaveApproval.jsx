import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import {
    UserCheck,
    UserX,
    Calendar,
    Clock,
    FileText,
    X,
    Search,
    Filter,
    MessageSquare,
    Check,
    AlertTriangle
} from "lucide-react"

export default function LeaveApproval({ onClose }) {
    const [activeTab, setActiveTab] = useState('pending')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLeave, setSelectedLeave] = useState(null)

    // Mock leave requests data
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            employeeName: "John Doe",
            employeeId: "EMP001",
            role: "Senior Developer",
            avatar: "JD",
            leaveType: "Annual Leave",
            startDate: "2024-01-20",
            endDate: "2024-01-24",
            days: 5,
            reason: "Family vacation planned for months",
            appliedDate: "2024-01-10",
            status: "pending",
            priority: "normal",
            coveringEmployee: "Sarah Miller",
            projectsAffected: ["Project Alpha", "API Development"]
        },
        {
            id: 2,
            employeeName: "Sarah Miller",
            employeeId: "EMP002",
            role: "UI/UX Designer",
            avatar: "SM",
            leaveType: "Sick Leave",
            startDate: "2024-01-15",
            endDate: "2024-01-17",
            days: 3,
            reason: "Medical appointment and recovery",
            appliedDate: "2024-01-14",
            status: "pending",
            priority: "urgent",
            coveringEmployee: "Emma Davis",
            projectsAffected: ["UI Redesign"]
        },
        {
            id: 3,
            employeeName: "Mike Johnson",
            employeeId: "EMP003",
            role: "DevOps Engineer",
            avatar: "MJ",
            leaveType: "Personal Leave",
            startDate: "2024-01-25",
            endDate: "2024-01-26",
            days: 2,
            reason: "Moving to new apartment",
            appliedDate: "2024-01-12",
            status: "pending",
            priority: "normal",
            coveringEmployee: "David Wilson",
            projectsAffected: ["Infrastructure Setup"]
        },
        {
            id: 4,
            employeeName: "Alice Brown",
            employeeId: "EMP004",
            role: "QA Engineer",
            avatar: "AB",
            leaveType: "Annual Leave",
            startDate: "2024-01-18",
            endDate: "2024-01-19",
            days: 2,
            reason: "Weekend extension for personal event",
            appliedDate: "2024-01-11",
            status: "approved",
            priority: "normal",
            coveringEmployee: "Lisa Garcia",
            projectsAffected: ["Testing Phase 2"],
            approvedBy: "Manager",
            approvedDate: "2024-01-12"
        },
        {
            id: 5,
            employeeName: "David Wilson",
            employeeId: "EMP005",
            role: "Backend Developer",
            avatar: "DW",
            leaveType: "Emergency Leave",
            startDate: "2024-01-13",
            endDate: "2024-01-13",
            days: 1,
            reason: "Family emergency",
            appliedDate: "2024-01-13",
            status: "rejected",
            priority: "urgent",
            coveringEmployee: "Robert Smith",
            projectsAffected: ["Backend API"],
            rejectedBy: "Manager",
            rejectedDate: "2024-01-13",
            rejectionReason: "Critical sprint deadline"
        }
    ])

    const handleApproval = (leaveId, action, comment = '') => {
        setLeaveRequests(prev => prev.map(leave =>
            leave.id === leaveId
                ? {
                    ...leave,
                    status: action,
                    [`${action}By`]: "Manager",
                    [`${action}Date`]: new Date().toISOString().split('T')[0],
                    [`${action}Comment`]: comment
                }
                : leave
        ))
        setSelectedLeave(null)
    }

    const getPendingRequests = () => leaveRequests.filter(req => req.status === 'pending')
    const getApprovedRequests = () => leaveRequests.filter(req => req.status === 'approved')
    const getRejectedRequests = () => leaveRequests.filter(req => req.status === 'rejected')

    const getDisplayRequests = () => {
        let requests = []
        switch (activeTab) {
            case 'pending': requests = getPendingRequests(); break;
            case 'approved': requests = getApprovedRequests(); break;
            case 'rejected': requests = getRejectedRequests(); break;
            default: requests = leaveRequests;
        }

        if (searchQuery) {
            return requests.filter(req =>
                req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        return requests
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'normal': return 'bg-blue-100 text-blue-800';
            case 'low': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getLeaveTypeColor = (type) => {
        switch (type) {
            case 'Annual Leave': return 'bg-green-100 text-green-800';
            case 'Sick Leave': return 'bg-yellow-100 text-yellow-800';
            case 'Personal Leave': return 'bg-purple-100 text-purple-800';
            case 'Emergency Leave': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Leave Request Management
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mt-4">
                    <Button
                        variant={activeTab === 'pending' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('pending')}
                        className="flex-1"
                    >
                        Pending ({getPendingRequests().length})
                    </Button>
                    <Button
                        variant={activeTab === 'approved' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('approved')}
                        className="flex-1"
                    >
                        Approved ({getApprovedRequests().length})
                    </Button>
                    <Button
                        variant={activeTab === 'rejected' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('rejected')}
                        className="flex-1"
                    >
                        Rejected ({getRejectedRequests().length})
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by employee name, ID, or leave type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </CardHeader>

            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {getDisplayRequests().map(request => (
                    <Card key={request.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3 flex-1">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback>{request.avatar}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">{request.employeeName}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            {request.employeeId}
                                        </Badge>
                                        <Badge className={getPriorityColor(request.priority)}>
                                            {request.priority}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-2">{request.role}</p>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <Badge className={getLeaveTypeColor(request.leaveType)}>
                                                {request.leaveType}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {request.startDate} to {request.endDate}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {request.days} day{request.days > 1 ? 's' : ''}
                                        </div>
                                        <div className="text-muted-foreground">
                                            Applied: {request.appliedDate}
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm"><strong>Reason:</strong> {request.reason}</p>
                                        <p className="text-sm"><strong>Covering:</strong> {request.coveringEmployee}</p>
                                        <p className="text-sm"><strong>Projects Affected:</strong> {request.projectsAffected.join(', ')}</p>
                                    </div>

                                    {(request.status === 'approved' || request.status === 'rejected') && (
                                        <div className="mt-2 p-2 bg-muted rounded">
                                            <p className="text-sm">
                                                <strong>{request.status === 'approved' ? 'Approved' : 'Rejected'} by:</strong> {request[`${request.status}By`]} on {request[`${request.status}Date`]}
                                            </p>
                                            {request.rejectionReason && (
                                                <p className="text-sm"><strong>Reason:</strong> {request.rejectionReason}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {request.status === 'pending' && (
                                <div className="flex gap-2 ml-4">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setSelectedLeave(request)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => handleApproval(request.id, 'approved')}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <UserCheck className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            const reason = prompt("Reason for rejection:")
                                            if (reason) handleApproval(request.id, 'rejected', reason)
                                        }}
                                    >
                                        <UserX className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}

                            {request.status === 'approved' && (
                                <Badge className="bg-green-100 text-green-800">
                                    <Check className="w-3 h-3 mr-1" />
                                    Approved
                                </Badge>
                            )}

                            {request.status === 'rejected' && (
                                <Badge className="bg-red-100 text-red-800">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Rejected
                                </Badge>
                            )}
                        </div>
                    </Card>
                ))}

                {getDisplayRequests().length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4" />
                        <p>No {activeTab} leave requests found</p>
                    </div>
                )}
            </CardContent>

            {/* Detailed View Modal */}
            {selectedLeave && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Leave Request Details</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedLeave(null)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback>{selectedLeave.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold">{selectedLeave.employeeName}</h4>
                                    <p className="text-sm text-muted-foreground">{selectedLeave.role}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p><strong>Leave Type:</strong> {selectedLeave.leaveType}</p>
                                <p><strong>Duration:</strong> {selectedLeave.startDate} to {selectedLeave.endDate} ({selectedLeave.days} days)</p>
                                <p><strong>Reason:</strong> {selectedLeave.reason}</p>
                                <p><strong>Covering Employee:</strong> {selectedLeave.coveringEmployee}</p>
                                <p><strong>Projects Affected:</strong> {selectedLeave.projectsAffected.join(', ')}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleApproval(selectedLeave.id, 'approved')}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        const reason = prompt("Reason for rejection:")
                                        if (reason) handleApproval(selectedLeave.id, 'rejected', reason)
                                    }}
                                    className="flex-1"
                                >
                                    <UserX className="w-4 h-4 mr-2" />
                                    Reject
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Card>
    )
}