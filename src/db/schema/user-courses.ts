import {
	sqliteTable,
	primaryKey,
	integer,
	text
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

import { user } from './user';
import { course } from './course';
import { courseLesson } from './course-lesson';

export const userCourses = sqliteTable(
	'user_courses',
	{
		userId: integer('user_id').notNull(),
		courseId: integer('course_id').notNull(),
		currentLessonId: integer('current_lesson_id'),
		completed: integer('completed', { mode: 'boolean' })
			.notNull()
			.default(false),
		enrolledAt: text('enrolled_at').default(sql`(CURRENT_DATE)`),
		completedAt: text('completed_at'),
		lastAccessedAt: text('last_accessed_at').default(sql`(CURRENT_DATE)`)
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

export type UserCourse = typeof userCourses.$inferSelect;
export type NewUserCourse = typeof userCourses.$inferInsert;
