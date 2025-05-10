import { asc, count, eq } from 'drizzle-orm';

import { db } from '..';
import { type User, user } from '../schema/user';
import { userRoles } from '../schema/user-roles';
import { userCourses } from '../schema/user-courses';
import { type Role } from '../schema/role';
import { course, type Course } from '../schema/course';
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

export const getCourseLessons = async (
	courseId: Course['id']
): Promise<CourseLesson[]> => {
	const courseLessons = await db.query.courseLesson.findMany({
		where: eq(courseLesson.courseId, courseId),
		orderBy: [asc(courseLesson.lessonOrder)]
	});

	if (!courseLessons) return [];

	return courseLessons;
};

export const getCourseLessonQuestions = async (
	lessonId: CourseLesson['id']
): Promise<CourseLessonQuestion[]> => {
	const courseLessonQuestions = await db.query.courseLessonQuestion.findMany({
		where: eq(courseLessonQuestion.lessonId, lessonId),
		orderBy: [asc(courseLessonQuestion.questionOrder)]
	});

	if (!courseLessonQuestions) return [];

	return courseLessonQuestions;
};

export const getAllCourses = async () => await db.query.course.findMany();

export const getAllCoursesCount = async () => {
	const countResult = await db.select({ count: count() }).from(course);
	return countResult[0].count;
};
