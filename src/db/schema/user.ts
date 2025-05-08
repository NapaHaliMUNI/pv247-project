import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { userRoles } from './user-roles';
import { userCourses } from './user-courses';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	avatarUrl: text('avatar_url'), // This needs to be a valid URL
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	deletedAt: text('deleted_at').default(sql`NULL`) // Soft delete
});

export const userRelations = relations(user, ({ many }) => ({
	userRoles: many(userRoles),
	userCourses: many(userCourses)
}));

export const userSelectSchema = createSelectSchema(user, {
	id: schema => schema.uuid(),
	email: schema => schema.email(),
	username: schema => schema.min(3).max(20),
	password: schema => schema.min(8),
	avatarUrl: schema => schema.url().optional(),
	createdAt: schema => schema.datetime(),
	updatedAt: schema => schema.datetime(),
	deletedAt: schema => schema.datetime().optional()
});
export type User = z.infer<typeof userSelectSchema>;

export const userInsertSchema = createInsertSchema(user, {
	id: schema => schema.uuid(),
	email: schema => schema.email(),
	username: schema => schema.min(3).max(20),
	password: schema => schema.min(8),
	avatarUrl: schema => schema.url().optional(),
	createdAt: schema => schema.datetime().optional(),
	updatedAt: schema => schema.datetime().optional(),
	deletedAt: schema => schema.datetime().optional()
});
export type NewUser = z.infer<typeof userInsertSchema>;
