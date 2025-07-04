
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Play, 
  TrendingUp, 
  User, 
  Mic,
  Star,
  ArrowRight,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentInterviews = [
    {
      id: 1,
      role: "Frontend Developer",
      date: "2024-01-15",
      duration: "25 min",
      score: 85,
      status: "completed"
    },
    {
      id: 2,
      role: "Product Manager",
      date: "2024-01-12",
      duration: "30 min",
      score: 78,
      status: "completed"
    },
    {
      id: 3,
      role: "Data Scientist",
      date: "2024-01-10",
      duration: "35 min",
      score: 92,
      status: "completed"
    }
  ];

  const interviewTypes = [
    {
      title: "Technical Interview",
      description: "Coding challenges and system design questions",
      duration: "45-60 min",
      difficulty: "Advanced",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Behavioral Interview",
      description: "Situational questions and soft skills assessment",
      duration: "30-45 min",
      difficulty: "Intermediate",
      icon: <User className="w-6 h-6" />
    },
    {
      title: "Case Study Interview",
      description: "Business scenarios and problem-solving exercises", 
      duration: "60-90 min",
      difficulty: "Advanced",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InterviewAI</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link to="/interview" className="text-gray-600 hover:text-gray-900 transition-colors">
              Interview
            </Link>
            <Button variant="outline" size="sm">Settings</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Ready to practice your interview skills?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% improvement
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Hours Practiced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">8.5</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Star className="w-3 h-3 mr-1" />
                Excellent
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Start */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Start New Interview</CardTitle>
                <CardDescription>
                  Choose an interview type to begin your practice session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviewTypes.map((type, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600">
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{type.title}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {type.duration}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {type.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Link to="/interview">
                      <Button size="sm" className="group-hover:bg-blue-700 transition-colors">
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Interviews */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Recent Interviews</CardTitle>
                <CardDescription>
                  Your interview history and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInterviews.map((interview) => (
                    <div 
                      key={interview.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{interview.role}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {interview.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {interview.duration}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {interview.score}%
                        </div>
                        <Badge 
                          variant={interview.score >= 80 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {interview.score >= 80 ? "Excellent" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Goal</CardTitle>
                <CardDescription>
                  Practice 3 interviews this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={66} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>2 of 3 completed</span>
                    <span>66%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/interview">
                  <Button className="w-full justify-between group">
                    Start Quick Interview
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
