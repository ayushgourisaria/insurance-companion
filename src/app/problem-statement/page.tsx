
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Map, Lightbulb, Info } from "lucide-react"

export default function ProblemStatementPage() {
  const journeyData = [
    {
      stage: "Member Onboarding",
      desc: "Member joins health plan and learns benefits",
      pain: "Confusing documents, information overload, lack of personalization",
      org: "Insurer",
      solution: "AI agent trained on insurance documents to guide members",
    },
    {
      stage: "Intelligent Visit Prep",
      desc: "Pre-visit questionnaires and financial guidance",
      pain: "Coverage confusion, forgotten questions, anxiety about costs",
      org: "Insurer + Healthcare",
      solution: "AI chatbot that talks to the member before the visit",
    },
    {
      stage: "Provider Visit",
      desc: "Doctor or hospital visit",
      pain: "Short appointment time, medical jargon, unclear next steps",
      org: "Healthcare",
      solution: "Doctor notes and past data ingested → AI explains and clarifies",
    },
    {
      stage: "GenAI Post Visit Summary",
      desc: "AI summary of diagnosis and follow-up",
      pain: "Members forget instructions, unclear treatment plans",
      org: "Healthcare",
      solution: "AI-generated visit summary",
    },
    {
      stage: "Claims Submission",
      desc: "Provider submits bill to insurer",
      pain: "No visibility into claim status, fear of unexpected bills",
      org: "Insurer",
      solution: "Claim timeline portal, notifications, anomaly detection",
    },
    {
      stage: "GenAI Claim Review & Explanation",
      desc: "AI explains claim decisions",
      pain: "Complex denials, unclear financial responsibility",
      org: "Insurer",
      solution: "AI-powered explanation and next-step guidance",
    },
    {
      stage: "Real-Time Feedback Collection",
      desc: "Feedback collected via surveys or chat",
      pain: "Feedback requested too late, members feel unheard",
      org: "Insurer",
      solution: "Instant feedback collection during interactions",
    },
    {
      stage: "Sentiment & Pattern Analysis",
      desc: "Emotion analysis across communications",
      pain: "Frustration ignored, recurring issues undetected",
      org: "Insurer",
      solution: "Sentiment analysis pipeline across journey stages",
    },
    {
      stage: "Appeals",
      desc: "Member disputes denial or partial payment",
      pain: "Complex legal language, low confidence in process",
      org: "Insurer",
      solution: "Appeal likelihood prediction and AI letter drafting",
    },
    {
      stage: "CAHPS Survey Prep & Simulation",
      desc: "Predict survey responses",
      pain: "Issues identified only after survey results",
      org: "Insurer",
      solution: "Behavioral analysis and survey response simulation",
    },
    {
      stage: "360° Member Experience Monitoring",
      desc: "Unified interaction visibility",
      pain: "Fragmented systems, no ownership of experience",
      org: "Insurer",
      solution: "Centralized analytics dashboard",
    },
    {
      stage: "GenAI-driven 1:1 Outreach & Coaching",
      desc: "Personalized communication and support",
      pain: "Generic messaging, impersonal engagement",
      org: "Insurer",
      solution: "AI assistant with memory of past interactions",
    },
  ]

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto pb-24">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-primary">
          <Briefcase className="h-8 w-8" />
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
            Problem Statement
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Understanding the business context and member journey transformation for AI-Powered Insurance Companions.
        </p>
      </header>

      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full space-y-4">
        {/* SECTION 1 — OVERVIEW */}
        <AccordionItem value="item-1" className="border rounded-2xl bg-white shadow-sm overflow-hidden px-4">
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex items-center gap-3 text-left">
              <Info className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold font-headline">Overview</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-foreground/80 leading-relaxed space-y-4">
            <p>
              The healthcare insurance experience in the United States is fragmented, reactive, and often confusing for members. Insured individuals struggle to understand their benefits, navigate claims decisions, manage costs, and receive timely support.
            </p>
            <p>
              Most insurers only engage members at isolated moments — onboarding, claims processing, or annual surveys. As a result:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Members feel overwhelmed during onboarding</li>
              <li>They are confused about coverage before doctor visits</li>
              <li>They do not understand claim decisions</li>
              <li>Feedback is collected too late</li>
              <li>Frustration is often invisible until CAHPS surveys</li>
            </ul>
            <p className="font-medium text-foreground pt-2">
              This prototype demonstrates a member-centric AI platform offered by insurers, designed to improve clarity, engagement, and satisfaction across the insurance journey.
            </p>
            <p>
              The platform does not require healthcare provider integration. It operates using insurer-side data and AI-driven interaction to guide members through coverage, claims, and support processes in real time.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 2 — STAGE-BY-STAGE BREAKDOWN */}
        <AccordionItem value="item-2" className="border rounded-2xl bg-white shadow-sm overflow-hidden px-4">
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex items-center gap-3 text-left">
              <Map className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold font-headline">Member Journey – Pain Points & Opportunities</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold">Stage</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold">Member Pain Points</TableHead>
                  <TableHead className="font-bold">Organization</TableHead>
                  <TableHead className="font-bold">Proposed Solution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journeyData.map((row, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-bold whitespace-nowrap">{row.stage}</TableCell>
                    <TableCell className="min-w-[200px]">{row.desc}</TableCell>
                    <TableCell className="min-w-[200px] text-destructive/80 italic">{row.pain}</TableCell>
                    <TableCell className="whitespace-nowrap">{row.org}</TableCell>
                    <TableCell className="min-w-[200px] text-primary font-medium">{row.solution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 3 — SOLUTION EXPLANATION */}
        <AccordionItem value="item-3" className="border rounded-2xl bg-white shadow-sm overflow-hidden px-4">
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex items-center gap-3 text-left">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold font-headline">Proposed Insurer-Offered AI Platform</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6 space-y-6">
            <div className="space-y-4">
              <p className="font-medium">
                This prototype represents an AI-powered member companion platform offered directly by insurance companies to their insured members.
              </p>
              <p>
                The solution focuses on insurer-controlled stages of the journey and enhances them using Generative AI.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-primary/5 border-none">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-primary">Core Components</h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li><strong className="text-foreground">AI-Guided Onboarding:</strong> Simple language explanations of benefits.</li>
                    <li><strong className="text-foreground">Visit Preparation:</strong> Proactive cost estimates and doctor question generation.</li>
                    <li><strong className="text-foreground">Claims Transparency:</strong> Plain English explanations of decisions.</li>
                    <li><strong className="text-foreground">Appeals Assistance:</strong> Guidance through disputes and letter drafting.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-none">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-accent-foreground">Strategic Positioning</h3>
                  <p className="text-sm leading-relaxed">
                    Designed to be deployed by insurers to transform from a reactive billing entity into a proactive, intelligent support system.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">• Insurance policy data</li>
                    <li className="flex items-center gap-2">• Claims history</li>
                    <li className="flex items-center gap-2">• Member interaction data</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4 space-y-2">
              <p className="text-sm text-muted-foreground italic">
                The goal is to improve satisfaction proactively rather than waiting for annual CAHPS surveys.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
