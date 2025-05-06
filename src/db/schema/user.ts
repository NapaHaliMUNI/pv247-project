import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { userRoles } from './user-roles';
import { userCourses } from './user-courses';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull().unique(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`)
});

export const userRelations = relations(user, ({ many }) => ({
	userRoles: many(userRoles),
	userCourses: many(userCourses)
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
