
"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShieldCheck, CalendarRange, HelpCircle, Send, Loader2, Sparkles, ChevronRight, FileText, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { understandCoverage } from "@/ai/flows/understand-coverage"
import { prepareForVisit } from "@/ai/flows/prepare-for-visit"
import { explainClaimDecision } from "@/ai/flows/explain-claim-decision"
import { MOCK_CLAIMS, USER_INFO } from "@/lib/mock-data"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ChatMessage = {
  role: "user" | "assistant"
  content: string
  metadata?: {
    type?: "claim-selection"
    claimId?: string
  }
}

type Mode = "coverage" | "visit" | "claims"

function AssistantContent() {
  const searchParams = useSearchParams()
  const initialMode = (searchParams.get("mode") as Mode) || "coverage"
  const claimIdParam = searchParams.get("claimId")

  const [mode, setMode] = useState<Mode>(initialMode)
  const [activeClaimId, setActiveClaimId] = useState<string | null>(claimIdParam)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length > 0) return

    let greeting = ""
    if (mode === "coverage") {
      greeting = "Hey there! I'm your **Insurance Companion**, your benefits guide. I can help you make sense of deductibles, co-pays, or what's covered. What's on your mind today?"
      setMessages([{ role: "assistant", content: greeting }])
    } else if (mode === "visit") {
      greeting = "Got a doctor's visit coming up? Tell me what kind of appointment it is, and I'll help you prepare so there are no surprises with the bill!"
      setMessages([{ role: "assistant", content: greeting }])
    } else if (mode === "claims") {
      const claimId = activeClaimId || claimIdParam
      const claim = MOCK_CLAIMS.find(c => c.id === claimId)
      if (claim) {
        greeting = `I've got the details for your visit to **${claim.provider}**. It looks like it was for **${claim.service}**. What can I help clarify about this decision for you?`
        setMessages([{ role: "assistant", content: greeting }])
      } else {
        greeting = "I can definitely help you understand your recent claims. Which one should we take a look at first?"
        setMessages([{ role: "assistant", content: greeting }])
      }
    }
  }, [mode, claimIdParam, activeClaimId, messages.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSelectClaim = async (claim: typeof MOCK_CLAIMS[0]) => {
    setActiveClaimId(claim.id)
    
    const userSelectionMsg: ChatMessage = { 
      role: "user", 
      content: `I'd like to talk about my claim for ${claim.service} at ${claim.provider}.`,
      metadata: { type: "claim-selection", claimId: claim.id }
    }
    
    setMessages(prev => [...prev, userSelectionMsg])
    setIsLoading(true)

    try {
      const result = await explainClaimDecision({
        claimDetails: `${claim.provider} - ${claim.service} - ${claim.amount} billed`,
        claimDecision: claim.explanation
      })
      const aiResponse = `${result.explanation}${result.nextSteps ? `\n\n**Next steps:**\n${result.nextSteps}` : ""}`
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I hit a snag trying to pull up those details. Could you try selecting it again?" }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setIsLoading(true)

    try {
      let aiResponse = ""
      if (mode === "coverage") {
        const result = await understandCoverage({
          query: userMsg,
          insurancePlan: USER_INFO.plan,
          chatHistory: messages.map(m => ({ role: m.role, content: m.content }))
        })
        aiResponse = result.explanation
      } else if (mode === "visit") {
        const result = await prepareForVisit({
          visitType: userMsg,
          insurancePlan: USER_INFO.plan
        })
        aiResponse = `${result.advice}\n\n*${result.disclaimer}*`
      } else if (mode === "claims") {
        const claim = MOCK_CLAIMS.find(c => c.id === activeClaimId) || MOCK_CLAIMS[0]
        const result = await explainClaimDecision({
          claimDetails: `${claim.provider} - ${claim.service} - ${claim.amount} billed`,
          claimDecision: claim.explanation
        })
        aiResponse = `${result.explanation}${result.nextSteps ? `\n\nHope this helps! **Next steps:**\n${result.nextSteps}` : ""}`
      }
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])
    } catch (error) {
      console.error("Assistant Error:", error)
      setMessages(prev => [...prev, { role: "assistant", content: "I'm so sorry, I ran into a bit of trouble processing that. Mind trying again?" }])
    } finally {
      setIsLoading(false)
    }
  }

  const modes = [
    { id: "coverage", label: "Benefits", icon: ShieldCheck },
    { id: "visit", label: "Visits", icon: CalendarRange },
    { id: "claims", label: "Claims", icon: HelpCircle },
  ]

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white overflow-hidden">
      <header className="p-4 border-b space-y-4 bg-background/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold font-headline text-foreground">Insurance Companion</h1>
          </div>
          {mode === "claims" && activeClaimId && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setActiveClaimId(null)
                setMessages(prev => [...prev, { role: "assistant", content: "I've reset our context. Which claim would you like to discuss now?" }])
              }}
              className="rounded-lg text-xs gap-1.5 h-8 border-primary/20"
            >
              <ArrowLeft className="h-3 w-3" />
              Switch Claim
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {modes.map((m) => (
            <Button
              key={m.id}
              variant={mode === m.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setMode(m.id as Mode)
                setActiveClaimId(null)
                setMessages([])
              }}
              className={cn(
                "flex-1 gap-2 rounded-xl h-10 border-none transition-all",
                mode === m.id ? "shadow-md scale-105" : "bg-muted/40 hover:bg-muted"
              )}
            >
              <m.icon className="h-4 w-4" />
              <span className="text-xs font-semibold">{m.label}</span>
            </Button>
          ))}
        </div>
      </header>

      <ScrollArea className="flex-1 p-4 bg-[#F8FBFE]">
        <div className="space-y-6 pb-20">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col animate-in fade-in slide-in-from-bottom-2",
                m.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] p-4 rounded-2xl shadow-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-white text-foreground rounded-tl-none border border-border/50"
                )}
              >
                {m.metadata?.type === "claim-selection" ? (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-foreground/20 p-2 rounded-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary-foreground">Reviewing Claim</p>
                      <p className="text-xs opacity-90 text-primary-foreground">
                        {MOCK_CLAIMS.find(c => c.id === m.metadata?.claimId)?.provider}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <span className="font-bold text-primary" {...props} />,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <span className="text-[10px] mt-1 text-muted-foreground uppercase tracking-widest font-bold mx-1">
                {m.role === "assistant" ? "Insurance Companion" : "You"}
              </span>

              {mode === "claims" && !activeClaimId && m.role === "assistant" && idx === messages.length - 1 && (
                <div className="grid gap-2 mt-4 w-full max-w-[90%]">
                  {MOCK_CLAIMS.map((claim) => (
                    <Button
                      key={claim.id}
                      variant="outline"
                      onClick={() => handleSelectClaim(claim)}
                      className="h-auto p-4 justify-between bg-white border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-xl shadow-sm group"
                    >
                      <div className="text-left space-y-1">
                        <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{claim.provider}</p>
                        <p className="text-xs text-muted-foreground">{claim.service} • {claim.date}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-border/50 shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground font-medium">Insurance Companion is thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white safe-area-bottom">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-1.5 bg-muted/30 rounded-2xl border border-border/50 focus-within:border-primary/50 transition-colors"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={mode === "claims" && !activeClaimId}
            placeholder={
              mode === "coverage" ? "Ask me anything about your benefits..." :
              mode === "visit" ? "What kind of visit is it?" : 
              activeClaimId ? "Ask about your claim..." : "Pick a claim from above first"
            }
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-base"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading || (mode === "claims" && !activeClaimId)}
            className="rounded-xl h-10 w-10 p-0 shadow-md transition-transform active:scale-95"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium uppercase tracking-tighter opacity-70">
          Insurance Companion is an AI and can make mistakes. Double check costs with your provider.
        </p>
      </div>
    </div>
  )
}

export default function AssistantPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AssistantContent />
    </Suspense>
  )
}
