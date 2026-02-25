"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_CLAIMS } from "@/lib/mock-data"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ClaimsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200"
      case "Partially Covered":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Denied":
        return "bg-red-100 text-red-700 border-red-200"
      case "Under Review":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Your Claims
        </h1>
        <p className="text-muted-foreground">Track and understand your recent activity</p>
      </header>

      <div className="space-y-4">
        {MOCK_CLAIMS.map((claim) => (
          <Link key={claim.id} href={`/claims/${claim.id}`}>
            <Card className="hover:shadow-md transition-all active:scale-[0.98] border-none shadow-sm mb-4">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold font-headline text-lg truncate max-w-[180px]">
                      {claim.provider}
                    </p>
                    <Badge variant="outline" className={cn("text-[10px] py-0", getStatusColor(claim.status))}>
                      {claim.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{claim.service}</p>
                  <p className="text-xs text-muted-foreground font-medium">{claim.date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-lg text-primary">{claim.responsibility === "$0.00" && claim.status !== "Denied" ? "Processing" : claim.responsibility}</p>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}