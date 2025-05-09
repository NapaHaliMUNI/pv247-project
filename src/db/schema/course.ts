import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { courseLesson } from './course-lesson';
import { user } from './user';
import { coursePrerequisites } from './course-prerequisistes';

export const courseDifficultySchema = z.enum([
	'Silver',
	'Gold',
	'Legendary Eagle',
	'The Global Elite'
]);
export type CourseDifficulty = z.infer<typeof courseDifficultySchema>;

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
export const course = sqliteTable('course', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	imageUrl: text('image_url'),
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
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by'),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by'),
	deletedAt: text('deleted_at').default(sql`NULL`), // Soft delete
	deletedBy: integer('deleted_by')
});

export const courseRelations = relations(course, ({ one, many }) => ({
	createdByUser: one(user, {
		fields: [course.createdBy],
		references: [user.id]
	}),
	updatedByUser: one(user, {
		fields: [course.updatedBy],
		references: [user.id]
	}),
	prerequisites: many(coursePrerequisites, {
		relationName: 'courseToPrerequisites'
	}),
	prerequisiteFor: many(coursePrerequisites, {
		relationName: 'prerequisiteToCourses'
	}),
	courseLessons: many(courseLesson)
}));

export const courseSelectSchema = createSelectSchema(course, {
	id: schema => schema.uuid(),
	title: schema => schema.max(256),
	imageUrl: schema => schema.url().optional(),
	shortDescription: schema => schema.max(512),
	longDescription: schema => schema.max(2048),
	category: () => courseCategorySchema,
	difficulty: () => courseDifficultySchema,
	duration: () => courseDurationSchema,
	createdAt: schema => schema.datetime(),
	updatedAt: schema => schema.datetime(),
	deletedAt: schema => schema.datetime().optional()
});
export type Course = z.infer<typeof courseSelectSchema>;
export const courseInsertSchema = createInsertSchema(course, {
	id: schema => schema.uuid(),
	title: schema => schema.max(256),
	imageUrl: schema => schema.url().optional(),
	shortDescription: schema => schema.max(512),
	longDescription: schema => schema.max(2048),
	category: () => courseCategorySchema,
	difficulty: () => courseDifficultySchema,
	duration: () => courseDurationSchema,
	createdAt: schema => schema.datetime().optional(),
	createdBy: schema => schema.optional(),
	updatedAt: schema => schema.datetime().optional(),
	updatedBy: schema => schema.optional(),
	deletedAt: schema => schema.datetime().optional(),
	deletedBy: schema => schema.optional()
});
export type NewCourse = z.infer<typeof courseInsertSchema>;
