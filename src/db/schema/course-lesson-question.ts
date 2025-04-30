import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { courseLesson } from './course-lesson';
import { user } from './user';

// Define question types
export const QUESTION_TYPES = {
	CHECKBOX: 'checkbox',
	RADIO: 'radio',
	TRUE_FALSE: 'true_false',
	TEXT: 'text'
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export const courseQuestionSchema = z.object({
	questionText: z.string(),
	options: z.array(
		z.object({
			id: z.number(),
			text: z.string()
		})
	),
	correctAnswers: z.array(z.number()) // Array of option IDs that are correct
});

export type CourseQuestion = z.infer<typeof courseQuestionSchema>;

export const courseLessonQuestion = sqliteTable('course_lesson_question', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	lessonId: integer('lesson_id')
		.notNull()
		.references(() => courseLesson.id),
	questionOrder: integer('question_order').notNull(), // Order within the lesson
	type: text('type').notNull(), // 'checkbox', 'radio', 'true_false', 'text'
	title: text('title').notNull(),
	questionData: text('question_data').notNull(), // JSON string with question details
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by')
		.notNull()
		.references(() => user.id),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by')
		.notNull()
		.references(() => user.id)
});

export const courseLessonQuestionRelations = {
	lesson: {
		columns: [courseLessonQuestion.lessonId],
		references: [courseLesson.id]
	},
	createdByUser: {
		columns: [courseLessonQuestion.createdBy],
		references: [user.id]
	},
	updatedByUser: {
		columns: [courseLessonQuestion.updatedBy],
		references: [user.id]
	}
};

// Add a unique constraint to ensure question_order is unique within each lesson
export const courseLessonQuestionConstraints = {
	uniqueQuestionOrderPerLesson: {
		name: 'unique_question_order_per_lesson',
		columns: [courseLessonQuestion.lessonId, courseLessonQuestion.questionOrder]
	}
};

export const courseLessonQuestionSelectSchema =
	createSelectSchema(courseLessonQuestion).strict();
export type CourseLessonQuestionSelectSchema = z.infer<
	typeof courseLessonQuestionSelectSchema
>;

export type CourseLessonQuestion = typeof courseLessonQuestion.$inferSelect;
export type NewCourseLessonQuestion = typeof courseLessonQuestion.$inferInsert;
