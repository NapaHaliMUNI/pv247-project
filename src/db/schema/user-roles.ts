import { sqliteTable, primaryKey, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { user } from './user';
import { role } from './role';

export const userRoles = sqliteTable(
	'user_roles',
	{
		userId: text('user_id').notNull(),
		roleId: text('role_id').notNull(),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`)
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

export const userRolesSelectSchema = createSelectSchema(userRoles, {
	userId: schema => schema.uuid(),
	roleId: schema => schema.uuid(),
	createdAt: schema => schema.datetime()
});
export type UserRole = z.infer<typeof userRolesSelectSchema>;
export const userRolesInsertSchema = createInsertSchema(userRoles, {
	userId: schema => schema.uuid(),
	roleId: schema => schema.uuid(),
	createdAt: schema => schema.datetime().optional()
});
export type NewUserRole = z.infer<typeof userRolesInsertSchema>;
