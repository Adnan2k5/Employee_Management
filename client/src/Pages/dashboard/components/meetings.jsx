"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Video, ExternalLink, Calendar, Clock } from "lucide-react"

export default function UpcomingMeetings() {
    const meetings = [
        {
            id: 1,
            title: "Daily Standup",
            time: "09:00 AM",
            date: "Today",
            platform: "Zoom",
            attendees: 8,
            type: "recurring",
        },
        {
            id: 2,
            title: "Project Review",
            time: "02:30 PM",
            date: "Today",
            platform: "Google Meet",
            attendees: 5,
            type: "important",
        },
        {
            id: 3,
            title: "Client Presentation",
            time: "10:00 AM",
            date: "Tomorrow",
            platform: "Teams",
            attendees: 12,
            type: "important",
        },
        {
            id: 4,
            title: "Team Building",
            time: "03:00 PM",
            date: "Friday",
            platform: "Zoom",
            attendees: 15,
            type: "social",
        },
    ]

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case "Zoom":
                return <Video className="w-4 h-4 text-blue-500" />
            case "Google Meet":
                return <Video className="w-4 h-4 text-green-500" />
            case "Teams":
                return <Video className="w-4 h-4 text-purple-500" />
            default:
                return <Video className="w-4 h-4" />
        }
    }

    const getTypeColor = (type) => {
        switch (type) {
            case "important":
                return "bg-red-100 text-red-700"
            case "recurring":
                return "bg-blue-100 text-blue-700"
            case "social":
                return "bg-green-100 text-green-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    My Meetings
                </CardTitle>
                <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {meetings.map((meeting) => (
                    <div
                        key={meeting.id}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex-shrink-0 mt-1">{getPlatformIcon(meeting.platform)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h4 className="font-medium text-sm text-foreground truncate">{meeting.title}</h4>
                                <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                                    <ExternalLink className="w-3 h-3" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">{meeting.date}</span>
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{meeting.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className={`text-xs ${getTypeColor(meeting.type)}`}>
                                    {meeting.platform}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{meeting.attendees} attendees</span>
                            </div>
                        </div>
                    </div>
                ))}

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    See all meetings
                </Button>
            </CardContent>
        </Card>
    )
}
