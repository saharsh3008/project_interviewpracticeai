
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Mic,
  TrendingUp,
  Clock,
  Target,
  Star,
  BarChart3,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Award,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const Results = () => {
  // Mock data for interview results
  const interviewResults = {
    overall_score: 85,
    completion_date: "2024-01-15",
    duration: "28 minutes",
    role: "Senior Frontend Developer",
    questions_answered: 5,
    total_questions: 5,
    strengths: [
      "Clear communication and articulation",
      "Strong technical problem-solving approach",
      "Good use of specific examples and metrics",
      "Confident delivery and professional demeanor"
    ],
    areas_for_improvement: [
      "Could provide more detail on leadership experiences",
      "Consider using the STAR method more consistently",
      "Expand on collaborative problem-solving examples"
    ],
    question_scores: [
      { question: "Challenging project experience", score: 90, feedback: "Excellent use of specific examples and clear problem-solving approach." },
      { question: "Working with difficult team members", score: 75, feedback: "Good conflict resolution skills, could elaborate more on long-term outcomes." },
      { question: "Learning new technology quickly", score: 88, feedback: "Strong learning methodology and adaptation skills demonstrated." },
      { question: "Decision making with incomplete information", score: 80, feedback: "Solid analytical approach, consider discussing risk mitigation strategies." },
      { question: "Giving constructive feedback", score: 92, feedback: "Outstanding emotional intelligence and communication skills shown." }
    ],
    speaking_metrics: {
      pace: 85,
      clarity: 90,
      confidence: 88,
      engagement: 82
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Needs Improvement";
  };

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
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
            <Link to="/results" className="text-blue-600 font-medium">
              Results
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Results</h1>
          <p className="text-gray-600">{interviewResults.role} • {interviewResults.completion_date}</p>
        </div>

        {/* Overall Score */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Overall Score</CardTitle>
              <CardDescription>Your performance across all interview questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {interviewResults.overall_score}%
              </div>
              <Badge className="text-sm px-4 py-2 bg-blue-100 text-blue-800">
                {getScoreBadge(interviewResults.overall_score)}
              </Badge>
              <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{interviewResults.duration}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{interviewResults.questions_answered}/{interviewResults.total_questions} Questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{interviewResults.completion_date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Question Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Question Breakdown
                </CardTitle>
                <CardDescription>Detailed analysis of your responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {interviewResults.question_scores.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-semibold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {getScoreBadge(item.score)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.question}</p>
                    <Progress value={item.score} className="h-2 mb-2" />
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {item.feedback}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Speaking Metrics */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Speaking Metrics
                </CardTitle>
                <CardDescription>Analysis of your communication style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(interviewResults.speaking_metrics).map(([metric, score]) => (
                    <div key={metric}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">{metric}</span>
                        <span className={`text-sm font-semibold ${getScoreColor(score)}`}>{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Strengths */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {interviewResults.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-orange-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {interviewResults.areas_for_improvement.map((area, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/interview">
                  <Button className="w-full">
                    Practice Again
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Download Report
                </Button>
                <Button variant="outline" className="w-full">
                  Share Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
