import {
	sqliteTable,
	integer,
	text,
	uniqueIndex
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { course } from './course';
import { user } from './user';
import { courseLessonQuestion } from './course-lesson-question';

export const courseLesson = sqliteTable(
	'course_lesson',
	{
		id: text('id').primaryKey(),
		courseId: text('course_id'),
		lessonOrder: integer('lesson_order').notNull(), // Order within the course
		title: text('title').notNull(),
		contentHtml: text('content_html').notNull(),
		videoUrl: text('video_url'),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		createdBy: integer('created_by'),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		updatedBy: integer('updated_by'),
		deletedAt: text('deleted_at').default(sql`NULL`), // Soft delete
		deletedBy: integer('deleted_by')
	},
	table => [
		uniqueIndex('unique_lesson_order_per_course').on(
			table.courseId,
			table.lessonOrder
		)
	]
);

export const courseLessonRelations = relations(
	courseLesson,
	({ one, many }) => ({
		course: one(course, {
			fields: [courseLesson.courseId],
			references: [course.id]
		}),
		createdByUser: one(user, {
			fields: [courseLesson.createdBy],
			references: [user.id]
		}),
		updatedByUser: one(user, {
			fields: [courseLesson.updatedBy],
			references: [user.id]
		}),
		courseLessonQuestions: many(courseLessonQuestion)
	})
);

export const courseLessonSelectSchema = createSelectSchema(courseLesson, {
	id: schema => schema.uuid(),
	courseId: schema => schema.uuid(),
	lessonOrder: schema => schema.positive(),
	title: schema => schema.max(512),
	videoUrl: schema => schema.optional(),
	createdAt: schema => schema.datetime(),
	updatedAt: schema => schema.datetime(),
	deletedAt: schema => schema.datetime().optional()
});
export type CourseLesson = z.infer<typeof courseLessonSelectSchema>;
export const courseLessonInsertSchema = createInsertSchema(courseLesson, {
	id: schema => schema.uuid(),
	courseId: schema => schema.uuid(),
	lessonOrder: schema => schema.positive(),
	title: schema => schema.max(512),
	contentHtml: schema => schema.max(2048),
	videoUrl: schema => schema.optional(),
	createdAt: schema => schema.datetime().optional(),
	createdBy: schema => schema.optional(),
	updatedAt: schema => schema.datetime().optional(),
	updatedBy: schema => schema.optional(),
	deletedAt: schema => schema.datetime().optional(),
	deletedBy: schema => schema.optional()
});
export type NewCourseLesson = z.infer<typeof courseLessonInsertSchema>;
