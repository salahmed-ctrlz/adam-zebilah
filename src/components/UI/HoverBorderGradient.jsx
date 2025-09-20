import React from 'react'
import { cn } from '../../utils/cn'

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        "relative flex rounded-full border border-neutral-200 bg-white/10 text-neutral-950 transition-all duration-300 hover:bg-white/20 dark:border-neutral-800 dark:bg-neutral-950/10 dark:text-neutral-50 dark:hover:bg-neutral-950/20",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full p-[1px]",
          "bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200",
          "dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800",
          "animate-spin-slow"
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: clockwise ? "normal" : "reverse",
        }}
      />
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-neutral-950 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 dark:bg-neutral-950/10 dark:text-neutral-50 dark:hover:bg-neutral-950/20",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  )
}
