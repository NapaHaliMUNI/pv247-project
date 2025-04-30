import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Import all schema tables
import { test } from '@/db/schema/test';
import { user, userRelations } from '@/db/schema/user';
import { role, roleRelations } from '@/db/schema/role';
import { userRoles, userRolesRelations } from '@/db/schema/user-roles';
import { course, courseRelations } from '@/db/schema/course';
import { courseLesson, courseLessonRelations } from '@/db/schema/course-lesson';
import {
	courseLessonQuestion,
	courseLessonQuestionRelations
} from '@/db/schema/course-lesson-question';
import { userCourses, userCoursesRelations } from '@/db/schema/user-courses';

const client = createClient({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!
});

// TODO: Include all schemas with their relations
export const db = drizzle(client, {
	schema: {
		test,
		user,
		role,
		userRoles,
		course,
		courseLesson,
		courseLessonQuestion,
		userCourses,

		// relations
		userRelations,
		roleRelations,
		userRolesRelations,
		courseRelations,
		courseLessonRelations,
		courseLessonQuestionRelations,
		userCoursesRelations
	}
});
