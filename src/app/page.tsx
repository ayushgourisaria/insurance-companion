"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { USER_INFO } from "@/lib/mock-data"
import { ShieldCheck, CalendarRange, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const deductiblePercent = (USER_INFO.deductible.current / USER_INFO.deductible.total) * 100
  const oopPercent = (USER_INFO.outOfPocket.current / USER_INFO.outOfPocket.total) * 100

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Hi there 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here’s your insurance overview
        </p>
      </header>

      <Card className="shadow-lg border-none bg-gradient-to-br from-white to-secondary/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Coverage Snapshot
          </CardTitle>
          <div className="flex justify-between items-end mt-1">
            <p className="text-xl font-bold font-headline text-primary">
              {USER_INFO.plan}
            </p>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              ID: {USER_INFO.memberId}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Deductible Progress</span>
              <span className="text-muted-foreground">${USER_INFO.deductible.current} / ${USER_INFO.deductible.total}</span>
            </div>
            <Progress value={deductiblePercent} className="h-3" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Out-of-Pocket Tracker</span>
              <span className="text-muted-foreground">${USER_INFO.outOfPocket.current} / ${USER_INFO.outOfPocket.total}</span>
            </div>
            <Progress value={oopPercent} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-headline flex items-center gap-2">
          How can we help today?
        </h2>
        <div className="grid gap-4">
          <Link href="/assistant?mode=coverage" passHref>
            <Button variant="outline" className="w-full h-auto p-6 justify-start gap-4 text-left border-primary/20 hover:bg-primary/5 hover:border-primary">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Understand My Coverage</p>
                <p className="text-sm text-muted-foreground">Explain benefits, copays & benefits</p>
              </div>
            </Button>
          </Link>

          <Link href="/assistant?mode=visit" passHref>
            <Button variant="outline" className="w-full h-auto p-6 justify-start gap-4 text-left border-primary/20 hover:bg-primary/5 hover:border-primary">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <CalendarRange className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Prepare for a Doctor Visit</p>
                <p className="text-sm text-muted-foreground">Get ready and avoid surprise bills</p>
              </div>
            </Button>
          </Link>

          <Link href="/assistant?mode=claims" passHref>
            <Button variant="outline" className="w-full h-auto p-6 justify-start gap-4 text-left border-primary/20 hover:bg-primary/5 hover:border-primary">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Ask About a Claim</p>
                <p className="text-sm text-muted-foreground">Clarify decisions and next steps</p>
              </div>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}