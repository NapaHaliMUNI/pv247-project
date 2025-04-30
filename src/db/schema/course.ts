import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { courseLesson } from './course-lesson';
import { user } from './user';

// Define the table type first to resolve the circular reference
export type CourseTable = ReturnType<typeof createCourseTable>;

// Create the table in a function
function createCourseTable() {
	return sqliteTable('course', {
		id: integer('id').primaryKey({ autoIncrement: true }),
		title: text('title').notNull(),
		shortDescription: text('short_description').notNull(),
		longDescription: text('long_description').notNull(),
		difficulty: integer('difficulty').notNull(), // 1-5 scale
		length: text('length').notNull(), // e.g., "10-15 minutes", "15-30 minutes", "30+ minutes"
		prerequisiteId: integer('prerequisite_id'), // Will reference course.id after table creation
		createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
		createdBy: integer('created_by')
			.notNull()
			.references(() => user.id),
		updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
		updatedBy: integer('updated_by')
			.notNull()
			.references(() => user.id)
	});
}

// Create the actual table
export const course = createCourseTable();

// Set up the references after the table is created
export const courseRelations = {
	prerequisite: {
		columns: [course.prerequisiteId],
		references: [course.id]
	},
	lessons: {
		columns: [course.id],
		references: [courseLesson.courseId]
	},
	createdByUser: {
		columns: [course.createdBy],
		references: [user.id]
	},
	updatedByUser: {
		columns: [course.updatedBy],
		references: [user.id]
	}
};

export const courseSelectSchema = createSelectSchema(course).strict();
export type CourseSelectSchema = z.infer<typeof courseSelectSchema>;

export type Course = typeof course.$inferSelect;
export type NewCourse = typeof course.$inferInsert;
