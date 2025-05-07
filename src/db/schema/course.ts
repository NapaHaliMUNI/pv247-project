import {
	sqliteTable,
	integer,
	text,
	foreignKey
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { z } from 'zod';

import { courseLesson } from './course-lesson';
import { user } from './user';

export const courseDifficultySchema = z.enum([
	'Beginner',
	'Intermediate',
	'Advanced',
	'Expert',
	'Master'
]);
export const courseDurationSchema = z.enum([
	'Short (5-15 minutes)',
	'Medium (15-30 minutes)',
	'Long (30+ minutes)'
]);

// Create the table in a function
export const course = sqliteTable(
	'course',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		title: text('title').notNull(),
		image: text('image').notNull(),
		shortDescription: text('short_description').notNull(),
		longDescription: text('long_description').notNull(),
		category: text('category').notNull(),
		difficulty: text('difficulty', {
			enum: courseDifficultySchema.options
		}).notNull(),
		duration: text('duration', {
			enum: courseDurationSchema.options
		}).notNull(),
		prerequisiteId: integer('prerequisite_id'),
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
