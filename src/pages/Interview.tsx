import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Settings,
  Home,
  MessageCircle,
  Clock,
  User,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { VoiceControls } from "@/components/VoiceControls";
import { InterviewProgress } from "@/components/InterviewProgress";

// Sample questions for the interview
const interviewQuestions = [
  {
    question: "Tell me about a challenging project you've worked on recently and how you overcame the obstacles you faced.",
    type: "Behavioral",
    timeLimit: "3-5 minutes"
  },
  {
    question: "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
    type: "Behavioral", 
    timeLimit: "3-4 minutes"
  },
  {
    question: "Give me an example of when you had to learn a new technology or skill quickly for a project.",
    type: "Technical",
    timeLimit: "4-5 minutes"
  },
  {
    question: "Tell me about a time when you had to make a decision with incomplete information. What was your approach?",
    type: "Problem Solving",
    timeLimit: "3-4 minutes"
  },
  {
    question: "Describe a situation where you had to give constructive feedback to a colleague or team member.",
    type: "Leadership",
    timeLimit: "3-4 minutes"
  }
];

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(5);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (interviewStarted) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsConnected(true);
      setInterviewStarted(true);
      toast({
        title: "Interview Started",
        description: "Good luck! The AI interviewer will begin shortly.",
      });
    } catch (error) {
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to start the interview.",
        variant: "destructive",
      });
    }
  };

  const handleEndInterview = () => {
    setIsConnected(false);
    setInterviewStarted(false);
    setIsRecording(false);
    setElapsedTime(0);
    setCurrentQuestion(1);
    toast({
      title: "Interview Ended",
      description: "Thank you for participating! Your results will be analyzed.",
    });
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      toast({
        title: "Moving to Next Question",
        description: `Question ${currentQuestion + 1} of ${totalQuestions}`,
      });
    } else {
      // Interview completed
      toast({
        title: "Interview Completed!",
        description: "Great job! All questions have been answered.",
      });
      setTimeout(() => {
        handleEndInterview();
      }, 2000);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      setRecordingStartTime(Date.now());
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone",
      });
    } else {
      // Stop recording
      setIsRecording(false);
      setRecordingStartTime(null);
      
      // Simulate processing time, then move to next question
      toast({
        title: "Processing Response",
        description: "Analyzing your answer...",
      });
      
      setTimeout(() => {
        moveToNextQuestion();
      }, 2000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getCurrentQuestionData = () => {
    return interviewQuestions[currentQuestion - 1] || interviewQuestions[0];
  };

  const currentQuestionData = getCurrentQuestionData();

  if (!interviewStarted) {
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
              <Link to="/interview" className="text-blue-600 font-medium">
                Interview
              </Link>
            </nav>
          </div>
        </header>

        {/* Pre-Interview Setup */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Ready for Your AI Interview?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              You're about to start a behavioral interview session. Make sure you're in a quiet environment 
              with a good microphone connection.
            </p>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-center">
                  <User className="w-5 h-5 mr-2" />
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">30-45</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">Behavioral</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Before we start:</h3>
              <ul className="text-left space-y-2 text-gray-600 max-w-md mx-auto">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Ensure your microphone is working properly
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Find a quiet, well-lit environment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Have water nearby and sit comfortably
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Speak clearly and at a moderate pace
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              onClick={handleStartInterview}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Interview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">InterviewAI</span>
            </Link>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Interview
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleEndInterview}>
              End Interview
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Question */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Question {currentQuestion} of {totalQuestions}</CardTitle>
                  <Badge variant="secondary">{currentQuestionData.type}</Badge>
                </div>
                <CardDescription>
                  Recommended response time: {currentQuestionData.timeLimit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg text-gray-900 leading-relaxed">
                  {currentQuestionData.question}
                </div>
              </CardContent>
            </Card>

            {/* Audio Visualizer */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-6">
                <AudioVisualizer isActive={isRecording} />
              </CardContent>
            </Card>

            {/* Voice Controls */}
            <VoiceControls 
              isRecording={isRecording}
              isMuted={isMuted}
              onToggleRecording={toggleRecording}
              onToggleMute={toggleMute}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Progress */}
            <InterviewProgress 
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              elapsedTime={elapsedTime}
            />

            {/* AI Interviewer Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Interviewer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Sarah</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {isRecording ? "Listening" : "Waiting"}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {isRecording 
                    ? "I'm listening to your response. Take your time to provide a detailed answer."
                    : "Click the microphone to start recording your response to the current question."
                  }
                </p>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2"></div>
                    Use the STAR method (Situation, Task, Action, Result)
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2"></div>
                    Be specific with examples and metrics
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2"></div>
                    Take a moment to think before responding
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2"></div>
                    Maintain eye contact with the camera
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
