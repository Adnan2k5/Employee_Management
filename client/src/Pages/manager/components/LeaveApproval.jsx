import { useEffect, useState } from "react"
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
    MessageSquare,
    Check,
    AlertTriangle
} from "lucide-react"
import { getLeaveData, updateLeave } from "../../../api/managerController"

export default function LeaveApproval({ onClose }) {
    const [activeTab, setActiveTab] = useState('pending')
    const [selectedLeave, setSelectedLeave] = useState(null)
    const [leaveData, setLeaveData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const fetchData = async () => {
        const data = await getLeaveData();
        setLeaveData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);


    // leaveData.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

    const handleApproval = async (leaveId, action) => {
        const res = await updateLeave(leaveId, action);
        if (res.status === 200) {
            console.log(`Leave ${action} successfully`)
        }
        fetchData();
    }

    const getPendingRequests = () => Array.isArray(leaveData) ? leaveData.filter(req => req.status === 'Pending') : []
    const getApprovedRequests = () => Array.isArray(leaveData) ? leaveData.filter(req => req.status === 'approved') : []
    const getRejectedRequests = () => Array.isArray(leaveData) ? leaveData.filter(req => req.status === 'rejected') : []

    const getDisplayRequests = () => {
        let requests = []
        switch (activeTab) {
            case 'pending': requests = getPendingRequests(); break;
            case 'approved': requests = getApprovedRequests(); break;
            case 'rejected': requests = getRejectedRequests(); break;
            default: requests = Array.isArray(leaveData) ? leaveData : [];
        }
        return requests
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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

                <div className="flex gap-2 mt-4">
                    <Button
                        variant={activeTab === 'pending' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('pending')}
                        className="flex-1"
                    >
                        Pending ({getPendingRequests()?.length})
                    </Button>
                    <Button
                        variant={activeTab === 'approved' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('approved')}
                        className="flex-1"
                    >
                        Approved ({getApprovedRequests()?.length})
                    </Button>
                    <Button
                        variant={activeTab === 'rejected' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('rejected')}
                        className="flex-1"
                    >
                        Rejected ({getRejectedRequests()?.length})
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {getDisplayRequests()?.map(request => (
                    <Card key={request.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3 flex-1">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback>{request?.avatar}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">{request.employeeName}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            {request?.employeeId}
                                        </Badge>
                                    </div>


                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {request?.startDate === request?.endDate
                                                ? formatDate(request?.endDate)
                                                : `${formatDate(request?.startDate)} to ${formatDate(request?.endDate)}`
                                            }
                                        </div>
                                        <div className="text-muted-foreground">
                                            Applied: {formatDate(request?.startDate)}
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm"><strong>Reason:</strong> {request?.reason}</p>
                                    </div>

                                    {(request?.status === 'approved' || request?.status === 'rejected') && (
                                        <div className="mt-2 p-2 bg-muted rounded">
                                            <p className="text-sm">
                                                <strong>{request?.status === 'approved' ? 'Approved' : 'Rejected'} by:</strong> {request?.[`${request?.status}By`]} on {request?.[`${request?.status}Date`]}
                                            </p>
                                            {request?.rejectionReason && (
                                                <p className="text-sm"><strong>Reason:</strong> {request?.rejectionReason}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {request.status === 'Pending' && (
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
                                            handleApproval(request.id, 'rejected')
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

                {getDisplayRequests()?.length === 0 && (
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
                                        handleApproval(selectedLeave.id, 'rejected')
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