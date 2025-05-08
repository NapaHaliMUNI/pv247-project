import { sqliteTable, primaryKey, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { user } from './user';
import { course } from './course';
import { courseLesson } from './course-lesson';

export const userCourses = sqliteTable(
	'user_courses',
	{
		userId: text('user_id').notNull(),
		courseId: text('course_id').notNull(),
		currentLessonId: text('current_lesson_id'),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		completedAt: text('completed_at').default(sql`NULL`)
	},
	table => [primaryKey({ columns: [table.userId, table.courseId] })]
);

export const userCoursesRelations = relations(userCourses, ({ one }) => ({
	user: one(user, {
		fields: [userCourses.userId],
		references: [user.id]
	}),
	course: one(course, {
		fields: [userCourses.courseId],
		references: [course.id]
	}),
	currentLesson: one(courseLesson, {
		fields: [userCourses.currentLessonId],
		references: [courseLesson.id]
	})
}));

export const userCoursesSelectSchema = createSelectSchema(userCourses, {
	userId: schema => schema.uuid(),
	courseId: schema => schema.uuid(),
	currentLessonId: schema => schema.uuid(),
	createdAt: schema => schema.datetime(),
	completedAt: schema => schema.datetime().optional()
});
export type UserCourse = z.infer<typeof userCoursesSelectSchema>;
export const userCoursesInsertSchema = createInsertSchema(userCourses, {
	userId: schema => schema.uuid(),
	courseId: schema => schema.uuid(),
	currentLessonId: schema => schema.uuid().optional(),
	createdAt: schema => schema.datetime().optional(),
	completedAt: schema => schema.datetime().optional()
});
export type NewUserCourse = z.infer<typeof userCoursesInsertSchema>;
