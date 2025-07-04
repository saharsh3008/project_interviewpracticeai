
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle } from "lucide-react";

interface InterviewProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  elapsedTime: number;
}

export const InterviewProgress = ({ 
  currentQuestion, 
  totalQuestions, 
  elapsedTime 
}: InterviewProgressProps) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Questions</span>
            <span className="text-sm font-medium">
              {currentQuestion} / {totalQuestions}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Time Elapsed */}
        <div className="flex items-center justify-between py-2 border-t">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">Time Elapsed</span>
          </div>
          <span className="font-mono text-lg font-medium text-gray-900">
            {formatTime(elapsedTime)}
          </span>
        </div>

        {/* Question Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Question Status</h4>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const questionNumber = index + 1;
              return (
                <div
                  key={questionNumber}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                    ${questionNumber < currentQuestion 
                      ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                      : questionNumber === currentQuestion
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-100 text-gray-500'
                    }
                  `}
                >
                  {questionNumber < currentQuestion ? '✓' : questionNumber}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
