import { db } from '..';
import { eq } from 'drizzle-orm';

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

export const deleteUser = async (userId: User['id']) => {
	const deletedUser = await db
		.delete(user)
		.where(eq(user.id, userId))
		.returning()
		.get();

	return deletedUser;
};
