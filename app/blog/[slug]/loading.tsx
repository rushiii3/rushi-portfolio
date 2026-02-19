import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // Or a custom loading skeleton component
    return (<div className="md:pt-32 pt-16 w-full">

        <Skeleton className="w-[120px] h-8 mb-8" />

        <div className="space-y-2">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-8 w-1/2" />
        </div>

        <Skeleton className="h-4 my-3 w-20" />

        <Skeleton className="aspect-video w-full rounded-2xl " />

        <div className="mt-5 space-y-3 w-full">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />

            <Skeleton className="h-5 w-full mt-5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
        </div>
    </div>)
}