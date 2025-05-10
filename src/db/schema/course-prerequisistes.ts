import {
	primaryKey,
	sqliteTable,
	text,
	uniqueIndex
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { course } from './course';

export const coursePrerequisites = sqliteTable(
	'course_prerequisites',
	{
		courseId: text('course_id').notNull(),
		prerequisiteCourseId: text('prerequisite_course_id').notNull(),
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		deletedAt: text('deleted_at').default(sql`NULL`) // Soft delete
	},
	table => [
		// Primary key to ensure each course-prerequisite pair is unique
		primaryKey({ columns: [table.courseId, table.prerequisiteCourseId] }),
		// Unique constraint to prevent duplicate entries
		uniqueIndex('unique_course_prerequisite').on(
			table.courseId,
			table.prerequisiteCourseId
		)
	]
);

export const coursePrerequisitesRelations = relations(
	coursePrerequisites,
	({ one }) => ({
		mainCourse: one(course, {
			fields: [coursePrerequisites.courseId],
			references: [course.id],
			relationName: 'courseToPrerequisites'
		}),
		prerequisiteCourse: one(course, {
			fields: [coursePrerequisites.prerequisiteCourseId],
			references: [course.id],
			relationName: 'prerequisiteToCourses'
		})
	})
);

export const coursePrerequisitesSelectSchema = createSelectSchema(
	coursePrerequisites,
	{
		courseId: schema => schema.uuid(),
		prerequisiteCourseId: schema => schema.uuid(),
		createdAt: schema => schema.datetime(),
		updatedAt: schema => schema.datetime(),
		deletedAt: schema => schema.datetime().optional()
	}
);

export type CoursePrerequisites = z.infer<
	typeof coursePrerequisitesSelectSchema
>;

export const coursePrerequisitesInsertSchema = createInsertSchema(
	coursePrerequisites,
	{
		courseId: schema => schema.uuid(),
		prerequisiteCourseId: schema => schema.uuid(),
		createdAt: schema => schema.datetime(),
		updatedAt: schema => schema.datetime(),
		deletedAt: schema => schema.datetime().optional()
	}
);

export type NewCoursePrerequisites = z.infer<
	typeof coursePrerequisitesInsertSchema
>;
