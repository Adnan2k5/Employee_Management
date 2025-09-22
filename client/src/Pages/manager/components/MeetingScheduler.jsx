import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import {
    Video,
    Users,
    Calendar,
    Clock,
    MapPin,
    X,
    Plus,
    Trash2,
    Edit,
    Search
} from "lucide-react"

export default function MeetingScheduler({ onClose }) {
    const [activeTab, setActiveTab] = useState('schedule')
    const [meetingForm, setMeetingForm] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '60',
        location: '',
        type: 'in-person',
        attendees: []
    })

    const [searchQuery, setSearchQuery] = useState('')

    // Mock data for existing meetings
    const [meetings, setMeetings] = useState([
        {
            id: 1,
            title: "Weekly Team Standup",
            date: "2024-01-15",
            time: "09:00",
            duration: 30,
            attendees: ["John Doe", "Sarah Miller", "Mike Johnson"],
            type: "video",
            location: "Zoom",
            status: "scheduled"
        },
        {
            id: 2,
            title: "Project Review Meeting",
            date: "2024-01-16",
            time: "14:00",
            duration: 90,
            attendees: ["Alice Brown", "David Wilson", "Emma Davis"],
            type: "in-person",
            location: "Conference Room A",
            status: "scheduled"
        },
        {
            id: 3,
            title: "Client Presentation",
            date: "2024-01-17",
            time: "10:30",
            duration: 60,
            attendees: ["Robert Smith", "Lisa Garcia"],
            type: "video",
            location: "Microsoft Teams",
            status: "scheduled"
        }
    ])

    // Mock employee data
    const employees = [
        { id: 1, name: "John Doe", role: "Senior Developer", avatar: "JD" },
        { id: 2, name: "Sarah Miller", role: "UI/UX Designer", avatar: "SM" },
        { id: 3, name: "Mike Johnson", role: "DevOps Engineer", avatar: "MJ" },
        { id: 4, name: "Alice Brown", role: "QA Engineer", avatar: "AB" },
        { id: 5, name: "David Wilson", role: "Backend Developer", avatar: "DW" },
        { id: 6, name: "Emma Davis", role: "Frontend Developer", avatar: "ED" },
        { id: 7, name: "Robert Smith", role: "Product Manager", avatar: "RS" },
        { id: 8, name: "Lisa Garcia", role: "Business Analyst", avatar: "LG" }
    ]

    const handleInputChange = (field, value) => {
        setMeetingForm(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const addAttendee = (employee) => {
        if (!meetingForm.attendees.includes(employee.name)) {
            setMeetingForm(prev => ({
                ...prev,
                attendees: [...prev.attendees, employee.name]
            }))
        }
    }

    const removeAttendee = (attendeeName) => {
        setMeetingForm(prev => ({
            ...prev,
            attendees: prev.attendees.filter(name => name !== attendeeName)
        }))
    }

    const handleScheduleMeeting = () => {
        const newMeeting = {
            id: meetings.length + 1,
            ...meetingForm,
            status: 'scheduled'
        }
        setMeetings(prev => [...prev, newMeeting])
        setMeetingForm({
            title: '',
            description: '',
            date: '',
            time: '',
            duration: '60',
            location: '',
            type: 'in-person',
            attendees: []
        })
        setActiveTab('view')
    }

    const deleteMeeting = (meetingId) => {
        setMeetings(prev => prev.filter(meeting => meeting.id !== meetingId))
    }

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Video className="w-5 h-5" />
                        Meeting Scheduler
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mt-4">
                    <Button
                        variant={activeTab === 'schedule' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('schedule')}
                        className="flex-1"
                    >
                        Schedule Meeting
                    </Button>
                    <Button
                        variant={activeTab === 'view' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('view')}
                        className="flex-1"
                    >
                        View Meetings
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {activeTab === 'schedule' && (
                    <div className="space-y-4">
                        {/* Meeting Title */}
                        <div>
                            <label className="text-sm font-medium">Meeting Title</label>
                            <Input
                                placeholder="Enter meeting title"
                                value={meetingForm.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                className="w-full p-2 border rounded-md"
                                rows="3"
                                placeholder="Meeting description or agenda"
                                value={meetingForm.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Date</label>
                                <Input
                                    type="date"
                                    value={meetingForm.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Time</label>
                                <Input
                                    type="time"
                                    value={meetingForm.time}
                                    onChange={(e) => handleInputChange('time', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Duration and Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Duration (minutes)</label>
                                <select
                                    className="w-full p-2 border rounded-md"
                                    value={meetingForm.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                >
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="90">1.5 hours</option>
                                    <option value="120">2 hours</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Meeting Type</label>
                                <select
                                    className="w-full p-2 border rounded-md"
                                    value={meetingForm.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                >
                                    <option value="in-person">In-Person</option>
                                    <option value="video">Video Call</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                placeholder="Conference room, Zoom link, etc."
                                value={meetingForm.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                            />
                        </div>

                        {/* Attendees */}
                        <div>
                            <label className="text-sm font-medium">Attendees</label>
                            <div className="relative mb-2">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search employees..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Employee List */}
                            <div className="max-h-32 overflow-y-auto border rounded-md p-2 space-y-1">
                                {filteredEmployees.map(employee => (
                                    <div
                                        key={employee.id}
                                        className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                                        onClick={() => addAttendee(employee)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-6 h-6">
                                                <AvatarFallback className="text-xs">{employee.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm">{employee.name}</p>
                                                <p className="text-xs text-muted-foreground">{employee.role}</p>
                                            </div>
                                        </div>
                                        <Plus className="w-4 h-4" />
                                    </div>
                                ))}
                            </div>

                            {/* Selected Attendees */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {meetingForm.attendees.map(attendee => (
                                    <Badge
                                        key={attendee}
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {attendee}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 hover:bg-destructive/20"
                                            onClick={() => removeAttendee(attendee)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleScheduleMeeting}
                            className="w-full"
                            disabled={!meetingForm.title || !meetingForm.date || !meetingForm.time}
                        >
                            Schedule Meeting
                        </Button>
                    </div>
                )}

                {activeTab === 'view' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Scheduled Meetings</h3>
                            <Badge variant="secondary">{meetings.length} meetings</Badge>
                        </div>

                        <div className="space-y-3">
                            {meetings.map(meeting => (
                                <Card key={meeting.id} className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{meeting.title}</h4>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {meeting.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {meeting.time} ({meeting.duration}m)
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {meeting.location}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Users className="w-4 h-4" />
                                                <span className="text-sm">{meeting.attendees.length} attendees</span>
                                                <Badge variant={meeting.type === 'video' ? 'default' : 'secondary'}>
                                                    {meeting.type}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteMeeting(meeting.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}