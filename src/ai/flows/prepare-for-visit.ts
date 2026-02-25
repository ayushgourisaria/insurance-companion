
'use server';

/**
 * @fileOverview This file defines a Genkit flow for helping users prepare for a doctor's visit.
 *
 * It suggests questions to ask about costs and coverage to avoid surprise bills.
 * The file exports:
 *   - prepareForVisit: The main function to call the flow.
 *   - PrepareForVisitInput: The input type for the prepareForVisit function.
 *   - PrepareForVisitOutput: The output type for the prepareForVisit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrepareForVisitInputSchema = z.object({
  visitType: z.string().describe('The type of doctor visit (e.g., routine checkup, specialist appointment).'),
  insurancePlan: z.string().describe('The name of the user insurance plan.'),
});
export type PrepareForVisitInput = z.infer<typeof PrepareForVisitInputSchema>;

const PrepareForVisitOutputSchema = z.object({
  advice: z.string().describe('Conversational advice and questions to ask the doctor.'),
  disclaimer: z.string().describe('A friendly disclaimer about cost estimates.'),
});
export type PrepareForVisitOutput = z.infer<typeof PrepareForVisitOutputSchema>;

export async function prepareForVisit(input: PrepareForVisitInput): Promise<PrepareForVisitOutput> {
  return prepareForVisitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prepareForVisitPrompt',
  input: {schema: PrepareForVisitInputSchema},
  output: {schema: PrepareForVisitOutputSchema},
  prompt: `You are Insurance Companion, a helpful assistant who helps people navigate the financial side of healthcare with empathy and clarity.

The user has a {{insurancePlan}} plan and is heading to a {{visitType}} visit. Your goal is to help them feel prepared and avoid "sticker shock."

STRICT GUIDELINES:
- Be warm, encouraging, and human.
- USE MARKDOWN for formatting (bolding, lists). 
- NEVER use HTML tags (like <b> or <ul>).
- Use bullet points for suggested questions to ask the doctor or the billing office.
- Keep paragraphs short and easy to scan.
- Focus purely on billing, logistics, and cost-saving tips.
- No medical advice.
- Always end with a clear follow-up question to see how else you can help (e.g., "Would you like me to help you find an in-network lab for any tests they might order?").

Output JSON: { advice: string, disclaimer: string }`,
});

const prepareForVisitFlow = ai.defineFlow(
  {
    name: 'prepareForVisitFlow',
    inputSchema: PrepareForVisitInputSchema,
    outputSchema: PrepareForVisitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
