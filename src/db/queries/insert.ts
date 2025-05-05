import { db } from '..';

import { NewUser, user } from '../schema/user';
import { NewUserRole, userRoles } from '../schema/user-roles';
import { NewUserCourse, userCourses } from '../schema/user-courses';

import { NewRole, role } from '../schema/role';

import { NewCourse, course } from '../schema/course';
import { NewCourseLesson, courseLesson } from '../schema/course-lesson';
import {
	NewCourseLessonQuestion,
	courseLessonQuestion
} from '../schema/course-lesson-question';

export const createUser = async (userData: NewUser) => {
	const newUser = await db.insert(user).values(userData).returning().get();
	return newUser;
};

export const createRole = async (roleData: NewRole) => {
	const newRole = await db.insert(role).values(roleData).returning().get();
	return newRole;
};

export const createUserRole = async (userRoleData: NewUserRole) => {
	const newUserRole = await db
		.insert(userRoles)
		.values(userRoleData)
		.returning()
		.get();
	return newUserRole;
};

export const createCourse = async (courseData: NewCourse) => {
	const newCourse = await db
		.insert(course)
		.values(courseData)
		.returning()
		.get();
	return newCourse;
};

export const createCourseLesson = async (lessonData: NewCourseLesson) => {
	const newLesson = await db
		.insert(courseLesson)
		.values(lessonData)
		.returning()
		.get();
	return newLesson;
};

export const createCourseLessonQuestion = async (
	questionData: NewCourseLessonQuestion
) => {
	const newQuestion = await db
		.insert(courseLessonQuestion)
		.values(questionData)
		.returning()
		.get();
	return newQuestion;
};

export const createUserCourse = async (userCourseData: NewUserCourse) => {
	const newUserCourse = await db
		.insert(userCourses)
		.values(userCourseData)
		.returning()
		.get();
	return newUserCourse;
};
