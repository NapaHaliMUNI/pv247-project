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
	'Silver',
	'Gold',
	'Legendary Eagle',
	'The Global Elite'
]);
export const courseDurationSchema = z.enum([
	'Short (10-30 minutes)',
	'Medium (30-60 minutes)',
	'Long (60+ minutes)'
]);
export const courseCategorySchema = z.enum([
	'Fundamentals',
	'Weapon Skills',
	'Movement',
	'Maps',
	'Utility',
	'Game Sense'
]);

// Create the table in a function
export const course = sqliteTable(
	'course',
	{
		id: text('id').primaryKey(),
		title: text('title').notNull(),
		image: text('image').notNull(),
		shortDescription: text('short_description').notNull(),
		longDescription: text('long_description').notNull(),
		category: text('category', {
			enum: courseCategorySchema.options
		}),
		difficulty: text('difficulty', {
			enum: courseDifficultySchema.options
		}),
		duration: text('duration', {
			enum: courseDurationSchema.options
		}),
		prerequisiteId: text('prerequisite_id'),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		createdBy: integer('created_by'),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		updatedBy: integer('updated_by')
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
