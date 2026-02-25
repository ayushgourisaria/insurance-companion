"use client"

import { useParams, useRouter } from "next/navigation"
import { MOCK_CLAIMS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { ChevronLeft, MessageCircle, HelpCircle, DollarSign } from "lucide-react"
import Link from "next/link"

export default function ClaimDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const claim = MOCK_CLAIMS.find((c) => c.id === id)

  if (!claim) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-lg font-medium">Claim not found.</p>
        <Button onClick={() => router.push("/claims")}>Back to Claims</Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/claims")}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-headline">Claim Details</h1>
      </div>

      <header className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-headline">{claim.provider}</h2>
            <p className="text-muted-foreground">{claim.service}</p>
            <p className="text-sm font-medium">{claim.date}</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            {claim.status}
          </Badge>
        </div>
      </header>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Service Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Amount Billed</TableCell>
                <TableCell className="text-right font-semibold">{claim.amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Plan Paid</TableCell>
                <TableCell className="text-right text-primary font-semibold">{claim.covered}</TableCell>
              </TableRow>
              <TableRow className="bg-primary/5">
                <TableCell className="font-bold text-lg">Your Responsibility</TableCell>
                <TableCell className="text-right text-lg font-bold text-primary">{claim.responsibility}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
          What happened?
        </h3>
        <Card className="border-primary/20 bg-primary/5 rounded-2xl shadow-none">
          <CardContent className="p-6">
            <p className="text-foreground leading-relaxed">
              {claim.explanation}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-3 pt-2">
        <Link href={`/assistant?mode=claims&claimId=${claim.id}`} passHref>
          <Button variant="outline" className="w-full h-14 justify-start gap-4 rounded-xl border-primary/30 hover:bg-primary/5 font-bold">
            <MessageCircle className="h-5 w-5 text-primary" />
            Ask AI About This Decision
          </Button>
        </Link>
        <Button variant="outline" className="w-full h-14 justify-start gap-4 rounded-xl border-primary/30 hover:bg-primary/5 font-bold">
          <HelpCircle className="h-5 w-5 text-primary" />
          Discuss Appeal
        </Button>
        <Button variant="outline" className="w-full h-14 justify-start gap-4 rounded-xl border-primary/30 hover:bg-primary/5 font-bold">
          <DollarSign className="h-5 w-5 text-primary" />
          Payment Help
        </Button>
      </section>
    </div>
  )
}