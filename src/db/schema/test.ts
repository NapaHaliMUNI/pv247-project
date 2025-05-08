import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const test = sqliteTable('test', {
	id: integer('id').primaryKey(),
	name: text('name').notNull()
});

export const testRelations = undefined;

export type Test = typeof test.$inferSelect;
export type NewTest = typeof test.$inferInsert;
