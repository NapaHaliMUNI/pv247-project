import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

export const test = sqliteTable('test', {
	id: integer('id').primaryKey(),
	name: text('name').notNull()
});

export const testRelations = undefined;

export const testSelectSchema = createSelectSchema(test).strict();
export type TestSelectSchema = z.infer<typeof testSelectSchema>;
