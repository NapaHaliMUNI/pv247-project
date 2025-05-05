import { eq } from 'drizzle-orm';

import { db } from '..';

import { User, user } from '../schema/user';
import { UserRole, userRoles } from '../schema/user-roles';
import { UserCourse, userCourses } from '../schema/user-courses';

import { Role, role } from '../schema/role';

import { Course, course } from '../schema/course';
import { CourseLesson, courseLesson } from '../schema/course-lesson';
import {
	CourseLessonQuestion,
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
