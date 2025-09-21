import { Calendar, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../../../components/ui/button'
import CalendarComponent from '../../../components/calender'

export const LeaveRequest = ({ onClose }) => {
    const [selectedDates, setSelectedDates] = useState([])
    const [reason, setReason] = useState('')

    const handleDateSelect = (date) => {
        if (selectedDates.length === 0) {
            // First date selection
            setSelectedDates([date])
        } else if (selectedDates.length === 1) {
            // Second date selection - create range
            const [firstDate] = selectedDates
            if (date.getTime() === firstDate.getTime()) {
                // Same date clicked, do nothing
                return
            }

            // Sort dates to ensure proper range
            const sortedDates = [firstDate, date].sort((a, b) => a - b)
            setSelectedDates(sortedDates)
        } else {
            // Already have a range, start fresh with new date
            setSelectedDates([date])
        }
    }

    const clearSelection = () => {
        setSelectedDates([])
    }

    const clearSpecificDate = (dateToRemove) => {
        if (selectedDates.length === 1) {
            setSelectedDates([])
        } else if (selectedDates.length === 2) {
            // Remove specific date and keep the other
            setSelectedDates(selectedDates.filter(date =>
                date.getTime() !== dateToRemove.getTime()
            ))
        }
    }

    const getSelectionSummary = () => {
        if (selectedDates.length === 0) {
            return 'No dates selected'
        } else if (selectedDates.length === 1) {
            return `Single day: ${selectedDates[0].toLocaleDateString()}`
        } else {
            return `Date range: ${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
        }
    }

    const getDayCount = () => {
        if (selectedDates.length === 0) return 0
        if (selectedDates.length === 1) return 1

        const diffTime = Math.abs(selectedDates[1] - selectedDates[0])
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        return diffDays
    }

    const handleSubmit = () => {
        if (selectedDates.length === 0) {
            alert('Please select at least one date for your leave')
            return
        }

        if (!reason.trim()) {
            alert('Please provide a reason for your leave')
            return
        }

        const leaveData = {
            type: selectedDates.length === 1 ? 'single' : 'range',
            dates: selectedDates,
            startDate: selectedDates[0],
            endDate: selectedDates.length === 2 ? selectedDates[1] : selectedDates[0],
            dayCount: getDayCount(),
            reason: reason.trim()
        }

        console.log('Leave request submitted:', leaveData)
        // Here you would send the data to your backend
        // submitLeaveRequest(leaveData)

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Leave Request</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Selection Summary */}
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-gray-700">{getSelectionSummary()}</p>
                            {selectedDates.length > 0 && (
                                <p className="text-xs text-gray-500">
                                    {getDayCount()} day{getDayCount() !== 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                        {selectedDates.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearSelection}
                                className="text-red-600 hover:text-red-700"
                            >
                                Clear All
                            </Button>
                        )}
                    </div>
                </div>

                {/* Calendar */}
                <div className="mb-4">
                    <CalendarComponent
                        onDateSelect={handleDateSelect}
                        selectedDates={selectedDates}
                        onDateRemove={clearSpecificDate}
                    />
                </div>

                {/* Reason Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Reason for Leave <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please provide a reason for your leave request..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-6">
                    <Button
                        onClick={handleSubmit}
                        className="w-full"
                        disabled={selectedDates.length === 0}
                    >
                        Submit Request
                    </Button>
                    <Button variant="outline" onClick={onClose} className="w-full">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}
