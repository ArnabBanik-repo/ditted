import { Skeleton } from "@nextui-org/react";

export default function PostLoading() {
  return (
    <div className="m-4">
      <div className="my-2">
        <Skeleton className="h-6 w-1/3"/>
      </div>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-5 w-2/3"/>
      </div>
    </div>
  )
}
