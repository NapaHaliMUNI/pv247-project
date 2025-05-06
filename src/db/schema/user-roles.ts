import {
	sqliteTable,
	primaryKey,
	integer,
	text
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { user } from './user';
import { role } from './role';

export const userRoles = sqliteTable(
	'user_roles',
	{
		userId: integer('user_id').notNull(),
		roleId: integer('role_id').notNull(),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`)
	},
	table => [primaryKey({ columns: [table.userId, table.roleId] })]
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	user: one(user, {
		fields: [userRoles.userId],
		references: [user.id]
	}),
	role: one(role, {
		fields: [userRoles.roleId],
		references: [role.id]
	})
}));

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;
