import { eq } from 'drizzle-orm';

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

export const updateUser = async (
	userId: User['id'],
	userData: Partial<User>
) => {
	const updatedUser = await db
		.update(user)
		.set(userData)
		.where(eq(user.id, userId))
		.returning()
		.get();

	return updatedUser;
};

export const updateUserRole = async (
	userRoleId: UserRole['userId'],
	userRoleData: Partial<UserRole>
) => {
	const updatedUserRole = await db
		.update(userRoles)
		.set(userRoleData)
		.where(eq(userRoles.userId, userRoleId))
		.returning()
		.get();

	return updatedUserRole;
};

export const updateUserCourse = async (
	userCourseId: UserCourse['userId'],
	userCourseData: Partial<UserCourse>
) => {
	const updatedUserCourse = await db
		.update(userCourses)
		.set(userCourseData)
		.where(eq(userCourses.userId, userCourseId))
		.returning()
		.get();

	return updatedUserCourse;
};

export const updateRole = async (
	roleId: Role['id'],
	roleData: Partial<Role>
) => {
	const updatedRole = await db
		.update(role)
		.set(roleData)
		.where(eq(role.id, roleId))
		.returning()
		.get();

	return updatedRole;
};

export const updateCourse = async (
	courseId: Course['id'],
	courseData: Partial<Course>
) => {
	const updatedCourse = await db
		.update(course)
		.set(courseData)
		.where(eq(course.id, courseId))
		.returning()
		.get();

	return updatedCourse;
};

export const updateCourseLesson = async (
	lessonId: CourseLesson['id'],
	lessonData: Partial<CourseLesson>
) => {
	const updatedLesson = await db
		.update(courseLesson)
		.set(lessonData)
		.where(eq(courseLesson.id, lessonId))
		.returning()
		.get();

	return updatedLesson;
};

export const updateCourseLessonQuestion = async (
	questionId: CourseLessonQuestion['id'],
	questionData: Partial<CourseLessonQuestion>
) => {
	const updatedQuestion = await db
		.update(courseLessonQuestion)
		.set(questionData)
		.where(eq(courseLessonQuestion.id, questionId))
		.returning()
		.get();

	return updatedQuestion;
};
