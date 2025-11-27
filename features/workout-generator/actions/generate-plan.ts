'use server';

import { getWorkoutPlan } from '@/lib/api/ai-client';
import { savePlanToDb } from '@/lib/api/db-client';

export async function generateWorkoutAction(prompt: string) {
    const plan = await getWorkoutPlan(prompt);
    await savePlanToDb(plan);
    return plan;
}
