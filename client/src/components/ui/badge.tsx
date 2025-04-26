import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // پرانا تم های اختصاصی
        tiffany: 
          "border-transparent bg-tiffany/10 text-tiffany hover:bg-tiffany/20",
        aqua: 
          "border-transparent bg-aqua/10 text-aqua hover:bg-aqua/20",
        navy: 
          "border-transparent bg-navy/10 text-navy hover:bg-navy/20",
        yellow: 
          "border-transparent bg-yellow/10 text-yellow-600 hover:bg-yellow/20",
        success: 
          "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning: 
          "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        info: 
          "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        purple: 
          "border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      },
      // سایز های مختلف
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-[10px]",
        lg: "px-3 py-0.75 text-sm",
      },
      // سبک های مختلف
      style: {
        default: "rounded-full",
        square: "rounded-md",
        pill: "rounded-full px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      style: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, style, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, style }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
