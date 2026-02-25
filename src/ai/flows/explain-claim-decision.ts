
'use server';

/**
 * @fileOverview An AI agent to explain claim decisions in simple language.
 *
 * - explainClaimDecision - A function that handles the claim decision explanation process.
 * - ExplainClaimDecisionInput - The input type for the explainClaimDecision function.
 * - ExplainClaimDecisionOutput - The return type for the explainClaimDecision function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainClaimDecisionInputSchema = z.object({
  claimDetails: z
    .string()
    .describe('Detailed information about the insurance claim.'),
  claimDecision: z
    .string()
    .describe('The decision made on the insurance claim (e.g., approved, denied, partially covered).'),
});
export type ExplainClaimDecisionInput = z.infer<typeof ExplainClaimDecisionInputSchema>;

const ExplainClaimDecisionOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A warm, plain-English explanation of the claim decision.'),
  nextSteps: z
    .string()
    .optional()
    .describe('Friendly guidance on what to do next or how to appeal.'),
});
export type ExplainClaimDecisionOutput = z.infer<typeof ExplainClaimDecisionOutputSchema>;

export async function explainClaimDecision(input: ExplainClaimDecisionInput): Promise<ExplainClaimDecisionOutput> {
  return explainClaimDecisionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainClaimDecisionPrompt',
  input: {schema: ExplainClaimDecisionInputSchema},
  output: {schema: ExplainClaimDecisionOutputSchema},
  prompt: `You are Insurance Companion, an empathetic assistant helping someone understand an insurance claim decision. 

Insurance jargon can be frustrating and scary. Your job is to translate this decision into a kind, human-centered explanation. 

STRICT GUIDELINES:
- USE MARKDOWN for formatting (bolding, lists).
- NEVER use HTML tags (like <b> or <ul>).
- Use short paragraphs (max 2 sentences).
- Use bullet points to break down costs, service codes, or reasons for the decision.
- Avoid "walls of text."
- If a claim was denied or only partially covered, be supportive and acknowledge that it's a frustrating situation.
- Always end your explanation with a thoughtful follow-up question to keep the user engaged (e.g., "Does that help clear things up, or should we talk about how to start an appeal?").

Claim Details: {{{claimDetails}}}
Claim Decision: {{{claimDecision}}}

Output JSON: { explanation: string, nextSteps: string }`,
});

const explainClaimDecisionFlow = ai.defineFlow(
  {
    name: 'explainClaimDecisionFlow',
    inputSchema: ExplainClaimDecisionInputSchema,
    outputSchema: ExplainClaimDecisionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
