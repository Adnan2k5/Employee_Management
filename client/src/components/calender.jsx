"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarComponent({ selectedDate, onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()

        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null)
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day))
        }

        return days
    }

    const navigateMonth = (direction) => {
        setCurrentMonth((prev) => {
            const newMonth = new Date(prev)
            newMonth.setMonth(prev.getMonth() + direction)
            return newMonth
        })
    }

    const isToday = (date) => {
        if (!date) return false
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }

    const isSelected = (date) => {
        if (!date || !selectedDate) return false
        return date.toDateString() === selectedDate.toDateString()
    }

    const hasEvent = (date) => {
        if (!date) return false
        // Mock events for demo
        const eventDays = [5, 12, 18, 25]
        return eventDays.includes(date.getDate())
    }

    const days = getDaysInMonth(currentMonth)

    return (
        <div className="w-full">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex gap-1">
                    <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => (
                    <div key={index} className="aspect-square">
                        {date ? (
                            <Button
                                variant={isSelected(date) ? "default" : "ghost"}
                                className={`w-full h-full p-0 relative ${isToday(date) ? "ring-2 ring-primary" : ""
                                    } ${hasEvent(date) ? "bg-accent/20" : ""}`}
                                onClick={() => onDateSelect(date)}
                            >
                                <span className="text-sm">{date.getDate()}</span>
                                {hasEvent(date) && (
                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                                )}
                            </Button>
                        ) : (
                            <div className="w-full h-full" />
                        )}
                    </div>
                ))}
            </div>

            {/* Google Calendar Integration Note */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">📅 Connected to Google Calendar - Events sync automatically</p>
            </div>
        </div>
    )
}
