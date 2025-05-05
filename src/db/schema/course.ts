import {
	sqliteTable,
	integer,
	text,
	foreignKey
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { courseLesson } from './course-lesson';
import { user } from './user';

// Create the table in a function
export const course = sqliteTable(
	'course',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		title: text('title').notNull(),
		shortDescription: text('short_description').notNull(),
		longDescription: text('long_description').notNull(),
		difficulty: integer('difficulty').notNull(), // 1-5 scale
		length: text('length').notNull(), // e.g., "10-15 minutes", "15-30 minutes", "30+ minutes"
		prerequisiteId: integer('prerequisite_id'), // Reference to course.id
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		createdBy: integer('created_by').notNull(),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		updatedBy: integer('updated_by').notNull()
	},
	table => [
		foreignKey({
			columns: [table.prerequisiteId],
			foreignColumns: [table.id]
		})
	]
);

export const courseRelations = relations(course, ({ one, many }) => ({
	createdByUser: one(user, {
		fields: [course.createdBy],
		references: [user.id]
	}),
	updatedByUser: one(user, {
		fields: [course.updatedBy],
		references: [user.id]
	}),
	prerequisiteCourse: one(course, {
		fields: [course.prerequisiteId],
		references: [course.id]
	}),
	courseLessons: many(courseLesson)
}));

export type Course = typeof course.$inferSelect;
export type NewCourse = typeof course.$inferInsert;
