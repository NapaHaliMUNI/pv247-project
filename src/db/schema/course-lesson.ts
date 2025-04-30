import {
	sqliteTable,
	integer,
	text,
	uniqueIndex
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { course } from './course';
import { user } from './user';
import { courseLessonQuestion } from './course-lesson-question';

export const courseLesson = sqliteTable(
	'course_lesson',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		courseId: integer('course_id')
			.notNull()
			.references(() => course.id),
		lessonOrder: integer('lesson_order').notNull(), // Order within the course
		title: text('title').notNull(),
		theory: text('theory').notNull(),
		videoUrl: text('video_url').notNull(),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		createdBy: integer('created_by')
			.notNull()
			.references(() => user.id),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		updatedBy: integer('updated_by')
			.notNull()
			.references(() => user.id)
	},
	table => [
		uniqueIndex('unique_lesson_order_per_course').on(
			table.courseId,
			table.lessonOrder
		)
	]
);

export const courseLessonRelations = {
	course: {
		columns: [courseLesson.courseId],
		references: [course.id]
	},
	createdByUser: {
		columns: [courseLesson.createdBy],
		references: [user.id]
	},
	updatedByUser: {
		columns: [courseLesson.updatedBy],
		references: [user.id]
	},
	questions: {
		columns: [courseLesson.id],
		references: [courseLessonQuestion.lessonId]
	}
};

export const courseLessonSelectSchema =
	createSelectSchema(courseLesson).strict();
export type CourseLessonSelectSchema = z.infer<typeof courseLessonSelectSchema>;

export type CourseLesson = typeof courseLesson.$inferSelect;
export type NewCourseLesson = typeof courseLesson.$inferInsert;
