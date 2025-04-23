import { db } from '@/db';

export const getTest = async () => await db.query.test.findFirst();
