import { cn } from "@/lib/utils"

// Skeleton component for loading placeholders
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#a88c70]", className)}
      {...props}
    />
  )
}

// Exporting the Skeleton component
export { Skeleton }
