import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import {
    Users,
    Search,
    Filter,
    X,
    Plus,
    Edit,
    Trash2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Star,
    Award,
    TrendingUp,
    User,
    Building
} from "lucide-react"

export default function EmployeeManagement({ onClose }) {
    const [activeTab, setActiveTab] = useState('list')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [filterDepartment, setFilterDepartment] = useState('all')

    // Mock employee data
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "John Doe",
            employeeId: "EMP001",
            role: "Senior Developer",
            department: "Engineering",
            email: "john.doe@company.com",
            phone: "+1-555-0123",
            location: "New York",
            avatar: "JD",
            status: "active",
            joinDate: "2022-03-15",
            salary: "$95,000",
            performance: 4.8,
            projects: ["Project Alpha", "API Development"],
            skills: ["React", "Node.js", "Python", "AWS"],
            manager: "Manager Name",
            lastReview: "2023-12-01",
            nextReview: "2024-06-01"
        },
        {
            id: 2,
            name: "Sarah Miller",
            employeeId: "EMP002",
            role: "UI/UX Designer",
            department: "Design",
            email: "sarah.miller@company.com",
            phone: "+1-555-0124",
            location: "San Francisco",
            avatar: "SM",
            status: "active",
            joinDate: "2021-08-20",
            salary: "$78,000",
            performance: 4.6,
            projects: ["UI Redesign", "Mobile App"],
            skills: ["Figma", "Adobe XD", "Sketch", "CSS"],
            manager: "Manager Name",
            lastReview: "2023-11-15",
            nextReview: "2024-05-15"
        },
        {
            id: 3,
            name: "Mike Johnson",
            employeeId: "EMP003",
            role: "DevOps Engineer",
            department: "Engineering",
            email: "mike.johnson@company.com",
            phone: "+1-555-0125",
            location: "Seattle",
            avatar: "MJ",
            status: "active",
            joinDate: "2023-01-10",
            salary: "$88,000",
            performance: 4.4,
            projects: ["Infrastructure Setup", "CI/CD Pipeline"],
            skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
            manager: "Manager Name",
            lastReview: "2023-10-30",
            nextReview: "2024-04-30"
        },
        {
            id: 4,
            name: "Alice Brown",
            employeeId: "EMP004",
            role: "QA Engineer",
            department: "Quality Assurance",
            email: "alice.brown@company.com",
            phone: "+1-555-0126",
            location: "Austin",
            avatar: "AB",
            status: "active",
            joinDate: "2022-11-05",
            salary: "$72,000",
            performance: 4.7,
            projects: ["Testing Phase 2", "Automation Suite"],
            skills: ["Selenium", "Jest", "Cypress", "Python"],
            manager: "Manager Name",
            lastReview: "2023-12-10",
            nextReview: "2024-06-10"
        },
        {
            id: 5,
            name: "David Wilson",
            employeeId: "EMP005",
            role: "Backend Developer",
            department: "Engineering",
            email: "david.wilson@company.com",
            phone: "+1-555-0127",
            location: "Chicago",
            avatar: "DW",
            status: "on-leave",
            joinDate: "2021-05-12",
            salary: "$85,000",
            performance: 4.5,
            projects: ["Backend API", "Database Optimization"],
            skills: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
            manager: "Manager Name",
            lastReview: "2023-09-20",
            nextReview: "2024-03-20"
        }
    ])

    const departments = ['all', 'Engineering', 'Design', 'Quality Assurance', 'Product', 'Marketing']

    const getFilteredEmployees = () => {
        let filtered = employees

        if (filterDepartment !== 'all') {
            filtered = filtered.filter(emp => emp.department === filterDepartment)
        }

        if (searchQuery) {
            filtered = filtered.filter(emp =>
                emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.department.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        return filtered
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800'
            case 'on-leave': return 'bg-yellow-100 text-yellow-800'
            case 'inactive': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getPerformanceStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ))
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Employee Management
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-4 mt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        className="px-3 py-2 border rounded-md"
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                        {departments.map(dept => (
                            <option key={dept} value={dept}>
                                {dept === 'all' ? 'All Departments' : dept}
                            </option>
                        ))}
                    </select>
                    <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Employee
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {getFilteredEmployees().map(employee => (
                    <Card key={employee.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4 flex-1">
                                <Avatar className="w-16 h-16">
                                    <AvatarFallback>{employee.avatar}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-lg">{employee.name}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            {employee.employeeId}
                                        </Badge>
                                        <Badge className={getStatusColor(employee.status)}>
                                            {employee.status}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium">{employee.role}</p>
                                            <p className="text-muted-foreground flex items-center gap-1">
                                                <Building className="w-3 h-3" />
                                                {employee.department}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {employee.email}
                                            </p>
                                            <p className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {employee.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {employee.location}
                                            </p>
                                            <p className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Joined: {employee.joinDate}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium">{employee.salary}</p>
                                            <div className="flex items-center gap-1">
                                                {getPerformanceStars(employee.performance)}
                                                <span className="text-xs ml-1">{employee.performance}/5</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-medium">Current Projects:</span>
                                            {employee.projects.map((project, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {project}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">Skills:</span>
                                            {employee.skills.slice(0, 3).map((skill, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {employee.skills.length > 3 && (
                                                <span className="text-xs text-muted-foreground">
                                                    +{employee.skills.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 ml-4">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedEmployee(employee)}
                                >
                                    <User className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {getFilteredEmployees().length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <Users className="w-12 h-12 mx-auto mb-4" />
                        <p>No employees found matching your criteria</p>
                    </div>
                )}
            </CardContent>

            {/* Employee Detail Modal */}
            {selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Employee Details
                                </CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedEmployee(null)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Header Info */}
                            <div className="flex items-center gap-4">
                                <Avatar className="w-20 h-20">
                                    <AvatarFallback className="text-lg">{selectedEmployee.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold">{selectedEmployee.name}</h3>
                                    <p className="text-lg text-muted-foreground">{selectedEmployee.role}</p>
                                    <Badge className={getStatusColor(selectedEmployee.status)}>
                                        {selectedEmployee.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">Contact Information</h4>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
                                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                        <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                                        <p><strong>Location:</strong> {selectedEmployee.location}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3">Employment Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Department:</strong> {selectedEmployee.department}</p>
                                        <p><strong>Join Date:</strong> {selectedEmployee.joinDate}</p>
                                        <p><strong>Salary:</strong> {selectedEmployee.salary}</p>
                                        <p><strong>Manager:</strong> {selectedEmployee.manager}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Performance */}
                            <div>
                                <h4 className="font-semibold mb-3">Performance & Reviews</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-muted rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="font-medium">Current Rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getPerformanceStars(selectedEmployee.performance)}
                                            <span className="font-bold">{selectedEmployee.performance}/5</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">Review Schedule</span>
                                        </div>
                                        <p className="text-sm">Last: {selectedEmployee.lastReview}</p>
                                        <p className="text-sm">Next: {selectedEmployee.nextReview}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Projects */}
                            <div>
                                <h4 className="font-semibold mb-3">Current Projects</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEmployee.projects.map((project, index) => (
                                        <Badge key={index} variant="secondary">
                                            {project}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h4 className="font-semibold mb-3">Skills & Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEmployee.skills.map((skill, index) => (
                                        <Badge key={index} variant="outline">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Button className="flex-1">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Employee
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Award className="w-4 h-4 mr-2" />
                                    Performance Review
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Card>
    )
}