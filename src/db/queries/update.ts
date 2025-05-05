import { and, eq } from 'drizzle-orm';

import { db } from '..';
import { type User, user } from '../schema/user';
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

export const updateUserCourse = async (
	userId: UserCourse['userId'],
	courseId: UserCourse['courseId'],
	userCourseData: Partial<UserCourse>
) => {
	const updatedUserCourse = await db
		.update(userCourses)
		.set(userCourseData)
		.where(
			and(eq(userCourses.userId, userId), eq(userCourses.courseId, courseId))
		)
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
