'use server';

import { getPlanFromDb } from '@/lib/api/db-client';
import { Week } from '../types';

export async function getPlansFromDBAction(): Promise<Week[]> {
    const plans = await getPlanFromDb();
    return plans;
}
