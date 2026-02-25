"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer, 
  LineChart as ReLineChart, 
  Line, 
  PieChart as RePieChart, 
  Pie, 
  Cell 
} from "recharts"
import { 
  Users, 
  MessageSquare, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Activity, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  BrainCircuit
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Mock Data
const SENTIMENT_TREND_DATA = [
  { date: "Mon", sentiment: 72 },
  { date: "Tue", sentiment: 68 },
  { date: "Wed", sentiment: 75 },
  { date: "Thu", sentiment: 71 },
  { date: "Fri", sentiment: 79 },
  { date: "Sat", sentiment: 82 },
  { date: "Sun", sentiment: 80 },
]

const TOP_TOPICS_DATA = [
  { topic: "Deductibles", count: 450, color: "var(--color-1)" },
  { topic: "Claim Denials", count: 380, color: "var(--color-2)" },
  { topic: "In-Network Doc", count: 320, color: "var(--color-3)" },
  { topic: "Drug Coverage", count: 210, color: "var(--color-4)" },
  { topic: "Pre-Auth", count: 180, color: "var(--color-5)" },
]

const SENTIMENT_BREAKDOWN = [
  { name: "Positive", value: 65, color: "#22c55e" },
  { name: "Neutral", value: 20, color: "#94a3b8" },
  { name: "Negative", value: 15, color: "#ef4444" },
]

const RISK_MEMBERS = [
  { name: "Sarah Miller", risk: "High", driver: "Repeated Denials", plan: "PPO Gold" },
  { name: "James Wilson", risk: "High", driver: "Cost Surprise", plan: "HSA Silver" },
  { name: "Elena Rodriguez", risk: "Medium", driver: "Coverage Confusion", plan: "PPO Gold" },
  { name: "David Chen", risk: "Medium", driver: "Network Dispute", plan: "PPO Bronze" },
  { name: "Michael Thompson", risk: "Low", driver: "General Inquiry", plan: "HMO Basic" },
]

const CLAIMS_INTELLIGENCE_DATA = [
  { type: "Radiology/MRI", negSentiment: 24, appeals: 12 },
  { type: "Emergency Visit", negSentiment: 42, appeals: 28 },
  { type: "Specialist Consult", negSentiment: 15, appeals: 5 },
  { type: "Pharmacy/Specialty", negSentiment: 31, appeals: 19 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const KPICard = ({ title, value, subtext, icon: Icon, trend }: any) => (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500" />
          ) : trend === "down" ? (
            <ArrowDownRight className="h-3 w-3 text-red-500" />
          ) : null}
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary mb-1">
            <BrainCircuit className="h-6 w-6" />
            <h1 className="text-sm font-bold uppercase tracking-widest">Insurer Operations</h1>
          </div>
          <h2 className="text-3xl font-bold font-headline">Experience Intelligence</h2>
          <p className="text-muted-foreground">Transforming AI conversations into operational insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-white">
            Live Feed: Active
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Region: All
          </Badge>
        </div>
      </header>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/50 border h-11 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="insights" className="rounded-lg">Conversation Insights</TabsTrigger>
          <TabsTrigger value="claims" className="rounded-lg">Claims Intelligence</TabsTrigger>
          <TabsTrigger value="risk" className="rounded-lg">Member Risk</TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg">AI Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <KPICard title="Total AI Conversations" value="12,482" subtext="+12% from last month" icon={MessageSquare} trend="up" />
            <KPICard title="Coverage Queries" value="48%" subtext="Dominant topic group" icon={FileText} />
            <KPICard title="Claims Queries" value="32%" subtext="High operational impact" icon={Activity} />
            <KPICard title="Negative Sentiment" value="14.2%" subtext="-2.1% improvement" icon={TrendingDown} trend="down" />
            <KPICard title="Appeal Intent" value="8.4%" subtext="1,048 members" icon={ShieldAlert} />
            <KPICard title="High Risk Members" value="124" subtext="Action required" icon={Users} trend="up" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Sentiment Trend (Last 7 Days)</CardTitle>
                <CardDescription>Aggregate positive sentiment %</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <ChartContainer config={{ sentiment: { label: "Sentiment %", color: "hsl(var(--primary))" } }} className="h-full w-full aspect-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={SENTIMENT_TREND_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <YAxis hide domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="sentiment" stroke="var(--color-sentiment)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-sentiment)" }} activeDot={{ r: 6 }} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Top 3 Recurring Member Issues</CardTitle>
                <CardDescription>AI-detected clusters requiring intervention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {[
                  { title: "Imaging Denial Logic", desc: "Members confused about MRI authorization rules.", impact: "High" },
                  { title: "Network Status Sync", desc: "Discrepancy in online vs reality provider status.", impact: "Medium" },
                  { title: "Coinsurance Calculation", desc: "Math of '20% after deductible' is unclear.", impact: "Low" }
                ].map((issue, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="h-10 w-10 shrink-0 bg-white rounded-lg border flex items-center justify-center font-bold text-primary">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm">{issue.title}</p>
                        <Badge variant="outline" className="text-[9px] h-4 uppercase">{issue.impact}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{issue.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle>Top Conversation Topics</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] w-full">
                <ChartContainer config={{ count: { label: "Frequency", color: "hsl(var(--primary))" } }} className="h-full w-full aspect-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={TOP_TOPICS_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} width={100} fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} barSize={20} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Sentiment Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                      data={SENTIMENT_BREAKDOWN}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SENTIMENT_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-4">
                  {SENTIMENT_BREAKDOWN.map(s => (
                    <div key={s.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs font-medium text-muted-foreground">{s.name}: {s.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Negative Interaction Keyword Cloud</CardTitle>
                <CardDescription>Trending terms in high-frustration conversations</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-2">
                {[
                  { text: "Hidden Cost", weight: 32 },
                  { text: "Out-of-Network", weight: 28 },
                  { text: "Surprise Bill", weight: 45 },
                  { text: "Denial", weight: 50 },
                  { text: "Mistake", weight: 20 },
                  { text: "Frustrated", weight: 35 },
                  { text: "Agent", weight: 40 },
                  { text: "Explanation", weight: 15 },
                  { text: "Code Error", weight: 22 },
                  { text: "Long Wait", weight: 18 }
                ].map((tag) => (
                  <Badge 
                    key={tag.text} 
                    variant="outline" 
                    className={cn(
                      "bg-white hover:bg-red-50 hover:text-red-700 transition-colors py-1 px-3",
                      tag.weight > 30 ? "border-red-200 text-red-600 font-bold" : "border-border text-muted-foreground"
                    )}
                  >
                    {tag.text}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <KPICard title="AI Follow-Up Triggered" value="62%" subtext="On initial denial view" icon={FileText} />
            <KPICard title="Appeal Guidance Usage" value="45%" subtext="Conversion from denial" icon={TrendingUp} />
            <KPICard title="Self-Service Resolution" value="78%" subtext="No call center escalation" icon={Users} />
          </div>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Claims Sentiment Analysis</CardTitle>
              <CardDescription>Identifying operational friction by service category</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Claim Type</TableHead>
                    <TableHead>Negative Sentiment %</TableHead>
                    <TableHead>Appeal Requests</TableHead>
                    <TableHead className="text-right pr-6">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CLAIMS_INTELLIGENCE_DATA.map((row) => (
                    <TableRow key={row.type}>
                      <TableCell className="font-bold pl-6">{row.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-red-400" style={{ width: `${row.negSentiment}%` }} />
                          </div>
                          <span className="text-xs">{row.negSentiment}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{row.appeals}</TableCell>
                      <TableCell className="text-right pr-6">
                        {row.negSentiment > 30 ? (
                          <Badge className="bg-red-50 text-red-700 border-red-100">Critical</Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">Stable</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h3 className="text-xl font-bold">Proactive Intervention Monitor</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white gap-2 cursor-pointer hover:bg-muted/50">
                <Filter className="h-3 w-3" /> Filter Plan
              </Badge>
              <Badge variant="outline" className="bg-white gap-2 cursor-pointer hover:bg-muted/50">
                <Filter className="h-3 w-3" /> High Risk Only
              </Badge>
            </div>
          </div>

          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Member Name</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Primary Dissatisfaction Driver</TableHead>
                    <TableHead>Plan Type</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RISK_MEMBERS.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell className="font-bold pl-6">{member.name}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          member.risk === "High" ? "bg-red-100 text-red-700 border-red-200" :
                          member.risk === "Medium" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-green-100 text-green-700 border-green-200"
                        )}>
                          {member.risk}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm italic text-muted-foreground">{member.driver}</TableCell>
                      <TableCell className="text-sm">{member.plan}</TableCell>
                      <TableCell className="text-right pr-6">
                        <Badge variant="outline" className="cursor-pointer hover:border-primary">Proactive Outreach</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <p className="text-xs text-center text-muted-foreground italic">
            This list is dynamically generated by sentiment scoring AI to prevent low CAHPS survey scores.
          </p>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard title="Avg Conv. Length" value="4.2m" subtext="Optimized for clarity" icon={MessageSquare} />
            <KPICard title="Resolution Rate" value="92%" subtext="Solved without human" icon={TrendingUp} />
            <KPICard title="Top Mode" value="Benefits" subtext="48% of usage" icon={BrainCircuit} />
            <KPICard title="Bot Happiness" value="4.8/5" subtext="User feedback score" icon={Activity} />
          </div>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle>Feature Engagement Breakdown</CardTitle>
              <CardDescription>Where members spend the most time with Insurance Companion</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] w-full pb-8">
              <ChartContainer config={{ 
                value: { label: "Usage %", color: "hsl(var(--primary))" }
              }} className="h-full w-full aspect-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart 
                    data={[
                      { name: "Benefits Explanation", value: 85 },
                      { name: "Visit Preparation", value: 62 },
                      { name: "Claim Clarification", value: 74 },
                      { name: "Appeal Drafting", value: 31 },
                      { name: "Provider Search", value: 58 },
                    ]}
                    layout="vertical"
                    margin={{ left: 10, right: 30, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      fontSize={11}
                      width={150}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} barSize={32} />
                  </ReBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
