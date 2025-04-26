export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-16 relative">
          <div className="animate-spin absolute inset-0 border-t-4 border-primary rounded-full"></div>
          <div className="absolute inset-2 border-2 border-gray-200 rounded-full"></div>
        </div>
        <p className="text-muted-foreground">Loading Skluva...</p>
      </div>
    </div>
  )
} 