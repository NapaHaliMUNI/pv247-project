import {
	sqliteTable,
	primaryKey,
	integer,
	text
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { user } from './user';
import { course } from './course';
import { courseLesson } from './course-lesson';

export const userCourses = sqliteTable(
	'user_courses',
	{
		userId: integer('user_id')
			.notNull()
			.references(() => user.id),
		courseId: integer('course_id')
			.notNull()
			.references(() => course.id),
		currentLessonId: integer('current_lesson_id').references(
			() => courseLesson.id
		),
		completed: integer('completed', { mode: 'boolean' })
			.notNull()
			.default(false),
		enrolledAt: text('enrolled_at').default(sql`(CURRENT_DATE)`),
		completedAt: text('completed_at'),
		lastAccessedAt: text('last_accessed_at').default(sql`(CURRENT_DATE)`)
	},
	table => [primaryKey({ columns: [table.userId, table.courseId] })]
);

export const userCoursesRelations = {
	user: {
		columns: [userCourses.userId],
		references: [user.id]
	},
	course: {
		columns: [userCourses.courseId],
		references: [course.id]
	},
	currentLesson: {
		columns: [userCourses.currentLessonId],
		references: [courseLesson.id]
	}
};

export const userCoursesSelectSchema = createSelectSchema(userCourses).strict();
export type UserCoursesSelectSchema = z.infer<typeof userCoursesSelectSchema>;

export type UserCourse = typeof userCourses.$inferSelect;
export type NewUserCourse = typeof userCourses.$inferInsert;
