import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

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

// In user.ts, update userRelations:
export const userRelations = {
	roles: {
		references: [userRoles.roleId, userRoles.userId],
		through: {
			columns: [userRoles.userId, userRoles.roleId]
		}
	},
	courses: {
		references: [userCourses.courseId, userCourses.userId],
		through: {
			columns: [userCourses.userId, userCourses.courseId]
		}
	}
};

export const userSelectSchema = createSelectSchema(user).strict();
export type UserSelectSchema = z.infer<typeof userSelectSchema>;

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
