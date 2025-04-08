
import React from "react";
import { cn } from "@/lib/utils";

interface RatingBarProps {
  label: string;
  score: number;
  maxScore?: number;
  className?: string;
}

const RatingBar: React.FC<RatingBarProps> = ({
  label,
  score,
  maxScore = 10,
  className,
}) => {
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on score
  const getColor = () => {
    if (percentage < 40) return "bg-red-500";
    if (percentage < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("mb-4", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold">{score}/{maxScore}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default RatingBar;
