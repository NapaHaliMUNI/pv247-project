import {
	sqliteTable,
	primaryKey,
	integer,
	text
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { user } from './user';
import { role } from './role';

export const userRoles = sqliteTable(
	'user_roles',
	{
		userId: integer('user_id')
			.notNull()
			.references(() => user.id),
		roleId: integer('role_id')
			.notNull()
			.references(() => role.id),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`)
	},
	table => [primaryKey({ columns: [table.userId, table.roleId] })]
);

export const userRolesRelations = {
	user: {
		columns: [userRoles.userId],
		references: [user.id]
	},
	role: {
		columns: [userRoles.roleId],
		references: [role.id]
	}
};

export const userRolesSelectSchema = createSelectSchema(userRoles).strict();
export type UserRolesSelectSchema = z.infer<typeof userRolesSelectSchema>;

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;
