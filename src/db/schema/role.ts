import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { user } from './user';

export const role = sqliteTable('role', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(), // admin
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by'),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by'),
	deletedAt: text('deleted_at').default(sql`NULL`), // Soft delete
	deletedBy: integer('deleted_by')
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

export const roleSelectSchema = createSelectSchema(role, {
	id: schema => schema.uuid(),
	name: schema => schema.max(256),
	createdAt: schema => schema.datetime(),
	updatedAt: schema => schema.datetime(),
	deletedAt: schema => schema.datetime().optional()
});
export type Role = z.infer<typeof roleSelectSchema>;
export const roleInsertSchema = createInsertSchema(role, {
	id: schema => schema.uuid(),
	name: schema => schema.max(256),
	createdAt: schema => schema.datetime().optional(),
	createdBy: schema => schema.optional(),
	updatedAt: schema => schema.datetime().optional(),
	updatedBy: schema => schema.optional(),
	deletedAt: schema => schema.datetime().optional(),
	deletedBy: schema => schema.optional()
});
export type NewRole = z.infer<typeof roleInsertSchema>;
