
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, MessageSquare, User, Briefcase, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border px-4 py-3 flex justify-between items-center safe-area-bottom h-[64px]" />
    )
  }

  const tabs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Claims", icon: FileText, href: "/claims" },
    { label: "Assistant", icon: MessageSquare, href: "/assistant" },
    { label: "Problem Statement", icon: Briefcase, href: "/problem-statement" },
    { label: "Admin (only visible to Insurer)", icon: LayoutDashboard, href: "/admin" },
    { label: "Profile", icon: User, href: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border px-2 py-3 flex justify-around items-center safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href))
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200 min-w-[50px] text-center",
              isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary/70"
            )}
          >
            <tab.icon className={cn("h-5 w-5", isActive && "fill-current/10")} />
            <span className="text-[9px] font-bold leading-tight whitespace-nowrap">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
