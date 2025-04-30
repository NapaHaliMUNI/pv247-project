import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { user } from './user';

export const role = sqliteTable('role', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	prefix: integer('prefix').notNull().default(1),
	priority: integer('priority').notNull(),
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by')
		.notNull()
		.references(() => user.id),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by')
		.notNull()
		.references(() => user.id)
});

export const roleRelations = {
	createdByUser: {
		columns: [role.createdBy],
		references: [user.id]
	},
	updatedByUser: {
		columns: [role.updatedBy],
		references: [user.id]
	}
};

export const roleSelectSchema = createSelectSchema(role).strict();
export type RoleSelectSchema = z.infer<typeof roleSelectSchema>;

export type Role = typeof role.$inferSelect;
export type NewRole = typeof role.$inferInsert;
