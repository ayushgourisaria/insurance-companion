import { config } from 'dotenv';
config();

import '@/ai/flows/prepare-for-visit.ts';
import '@/ai/flows/understand-coverage.ts';
import '@/ai/flows/explain-claim-decision.ts';