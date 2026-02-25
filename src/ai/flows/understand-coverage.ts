
// src/ai/flows/understand-coverage.ts
'use server';
/**
 * @fileOverview A flow that explains insurance coverage in simple terms.
 *
 * - understandCoverage - A function that handles the coverage explanation process.
 * - UnderstandCoverageInput - The input type for the understandCoverage function.
 * - UnderstandCoverageOutput - The return type for the understandCoverage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UnderstandCoverageInputSchema = z.object({
  query: z.string().describe('The user query about their insurance coverage.'),
  insurancePlan: z.string().describe('The name of the user insurance plan.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history.'),
});
export type UnderstandCoverageInput = z.infer<typeof UnderstandCoverageInputSchema>;

const UnderstandCoverageOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the insurance coverage.'),
});
export type UnderstandCoverageOutput = z.infer<typeof UnderstandCoverageOutputSchema>;

export async function understandCoverage(input: UnderstandCoverageInput): Promise<UnderstandCoverageOutput> {
  return understandCoverageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'understandCoveragePrompt',
  input: {schema: UnderstandCoverageInputSchema},
  output: {schema: UnderstandCoverageOutputSchema},
  prompt: `You are a warm, helpful insurance benefits guide named Insurance Companion. Your goal is to make complex insurance topics feel simple and manageable.

The user has the following insurance plan: {{{insurancePlan}}}. 

STRICT GUIDELINES:
- Use a friendly, conversational, and empathetic tone.
- USE MARKDOWN for formatting (bolding, lists). 
- NEVER use HTML tags (like <b> or <ul>).
- Break down concepts like deductibles, copays, or out-of-pocket maximums using bullet points.
- Keep paragraphs very short (max 2 sentences). Avoid large blocks of text.
- Use human analogies to explain things (e.g., "Think of a deductible like a cover charge at a club...").
- Always end your response with a clear, thoughtful follow-up question to keep the conversation going and ensure the user feels heard.
- Do not provide medical advice.
- If you don't know something for sure, be honest and suggest where they can find it (like in their Summary of Benefits).

Chat History:
{{#each chatHistory}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{query}}}`, 
});

const understandCoverageFlow = ai.defineFlow(
  {
    name: 'understandCoverageFlow',
    inputSchema: UnderstandCoverageInputSchema,
    outputSchema: UnderstandCoverageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
