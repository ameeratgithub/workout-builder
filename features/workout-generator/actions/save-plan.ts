'use server';

import { savePlanToDb } from '@/lib/api/db-client';
import { Week } from '../types';

export async function savePlanToDbAction(data: Week[]) {
  const plan = await savePlanToDb(data);
  return plan;
}