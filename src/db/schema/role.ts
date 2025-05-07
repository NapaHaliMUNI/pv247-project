import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { user } from './user';

export const role = sqliteTable('role', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	prefix: integer('prefix').notNull().default(1),
	priority: integer('priority').notNull(),
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by'),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by')
});

export const roleRelations = relations(role, ({ one }) => ({
	createdByUser: one(user, {
		fields: [role.createdBy],
		references: [user.id]
	}),
	updatedByUser: one(user, {
		fields: [role.updatedBy],
		references: [user.id]
	})
}));

export type Role = typeof role.$inferSelect;
export type NewRole = typeof role.$inferInsert;
