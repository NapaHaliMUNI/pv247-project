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

export const deleteUser = async (userId: User['id']) => {
	const deletedUser = await db
		.delete(user)
		.where(eq(user.id, userId))
		.returning()
		.get();

	return deletedUser;
};

export const deleteUserRole = async (userRoleId: UserRole['userId']) => {
	const deletedUserRole = await db
		.delete(userRoles)
		.where(eq(userRoles.userId, userRoleId))
		.returning()
		.get();

	return deletedUserRole;
};

export const deleteUserCourse = async (userCourseId: UserCourse['userId']) => {
	const deletedUserCourse = await db
		.delete(userCourses)
		.where(eq(userCourses.userId, userCourseId))
		.returning()
		.get();

	return deletedUserCourse;
};

export const deleteRole = async (roleId: Role['id']) => {
	const deletedRole = await db
		.delete(role)
		.where(eq(role.id, roleId))
		.returning()
		.get();

	return deletedRole;
};

export const deleteCourse = async (courseId: Course['id']) => {
	const deletedCourse = await db
		.delete(course)
		.where(eq(course.id, courseId))
		.returning()
		.get();

	return deletedCourse;
};

export const deleteCourseLesson = async (lessonId: CourseLesson['id']) => {
	const deletedLesson = await db
		.delete(courseLesson)
		.where(eq(courseLesson.id, lessonId))
		.returning()
		.get();

	return deletedLesson;
};

export const deleteCourseLessonQuestion = async (
	questionId: CourseLessonQuestion['id']
) => {
	const deletedQuestion = await db
		.delete(courseLessonQuestion)
		.where(eq(courseLessonQuestion.id, questionId))
		.returning()
		.get();

	return deletedQuestion;
};
