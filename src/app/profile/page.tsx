"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { USER_INFO } from "@/lib/mock-data"
import { Phone, Mail, ExternalLink, Shield, LogOut } from "lucide-react"

export default function ProfilePage() {
  const initials = USER_INFO.name.split(" ").map(n => n[0]).join("")

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <header className="flex flex-col items-center gap-4 py-4">
        <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-md">
          <AvatarImage src={`https://picsum.photos/seed/${initials}/200`} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold font-headline">{USER_INFO.name}</h1>
          <p className="text-muted-foreground font-medium">{USER_INFO.plan}</p>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
          Member Details
        </h2>
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Member ID</span>
                <span className="font-bold">{USER_INFO.memberId}</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Group Number</span>
                <span className="font-bold">GRP-998877</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Policy Status</span>
                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
          Support & Resources
        </h2>
        <div className="grid gap-3">
          <Button variant="outline" className="w-full h-14 justify-between px-6 rounded-2xl border-primary/20 hover:bg-primary/5">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold">Contact Support</span>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="outline" className="w-full h-14 justify-between px-6 rounded-2xl border-primary/20 hover:bg-primary/5">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold">Message Benefits Admin</span>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="outline" className="w-full h-14 justify-between px-6 rounded-2xl border-primary/20 hover:bg-primary/5">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold">Privacy & Terms</span>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </section>

      <Button variant="ghost" className="w-full h-14 text-destructive hover:bg-destructive/5 rounded-2xl gap-3 font-bold mt-4">
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>
    </div>
  )
}