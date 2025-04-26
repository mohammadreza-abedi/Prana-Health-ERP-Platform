import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  valueClassName?: string;
  backgroundClassName?: string;
  showPercentage?: boolean;
}

export function ProgressRing({
  value,
  max,
  size = 64,
  strokeWidth = 4,
  className,
  valueClassName,
  backgroundClassName,
  showPercentage = true,
}: ProgressRingProps) {
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const percentage = Math.round(progress * 100);
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <div className="relative">
      <svg className="progress-ring" width={size} height={size}>
        <circle
          className={cn("text-slate-200 dark:text-slate-700", backgroundClassName)}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn("text-tiffany", valueClassName)}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {percentage}٪
        </div>
      )}
    </div>
  );
}
