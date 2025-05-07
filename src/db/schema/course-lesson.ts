import {
	sqliteTable,
	integer,
	text,
	uniqueIndex
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { course } from './course';
import { user } from './user';
import { courseLessonQuestion } from './course-lesson-question';

export const courseLesson = sqliteTable(
	'course_lesson',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		courseId: integer('course_id').notNull(),
		lessonOrder: integer('lesson_order').notNull(), // Order within the course
		title: text('title').notNull(),
		content: text('content').notNull(),
		videoUrl: text('video_url').notNull(),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		createdBy: integer('created_by').notNull(),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		updatedBy: integer('updated_by').notNull()
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

export type CourseLesson = typeof courseLesson.$inferSelect;
export type NewCourseLesson = typeof courseLesson.$inferInsert;
