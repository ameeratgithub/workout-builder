import { kv } from '@vercel/kv';
import { Week } from '@/features/workout-generator/types';
import 'server-only';

const DB_KEY = 'global_workout_plan';

export async function savePlanToDb(weeks: Week[]) {
    // Sets the JSON blob. Expire in 30 days (optional)
    await kv.set(DB_KEY, weeks, { ex: 60 * 60 * 24 * 30 });
}

export async function getPlanFromDb(): Promise<Week[]> {
    const data = await kv.get<Week[]>(DB_KEY);
    return data || [];
}
