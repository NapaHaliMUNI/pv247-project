import { asc, count, eq, getTableColumns, gt, sql } from 'drizzle-orm';
import { db } from '..';

import { type User, user } from '../schema/user';
import { type UserRole, userRoles } from '../schema/user-roles';
import { type UserCourse, userCourses } from '../schema/user-courses';

import { type Role, role } from '../schema/role';

import { type Course, course } from '../schema/course';
import { type CourseLesson, courseLesson } from '../schema/course-lesson';
import {
	type CourseLessonQuestion,
	courseLessonQuestion
} from '../schema/course-lesson-question';

export const getUserById = async (id: User['id']): Promise<User | null> => {
	const userData = await db.query.user.findFirst({
		where: eq(user.id, id)
	});

	if (!userData) return null;
	return userData;
};

export const getUserRoles = async (userId: User['id']): Promise<Role[]> => {
	const userRolesData = await db.query.userRoles.findMany({
		where: eq(userRoles.userId, userId),
		with: {
			role: true
		}
	});

	if (!userRolesData) return [];

	return userRolesData.map(userRole => userRole.role);
};

export const getUserCourses = async (userId: User['id']): Promise<Course[]> => {
	const userCoursesData = await db.query.userCourses.findMany({
		where: eq(userCourses.userId, userId),
		with: {
			course: true
		}
	});

	if (!userCoursesData) return [];

	return userCoursesData.map(userCourse => userCourse.course);
};

export const getUserCoursesCount = async (
	userId: User['id']
): Promise<number> => {
	const userCoursesCount = await db
		.select({ count: count(userCourses.courseId) })
		.from(userCourses)
		.where(eq(userCourses.userId, userId))
		.get();

	if (!userCoursesCount) return 0;

	return userCoursesCount.count;
};
