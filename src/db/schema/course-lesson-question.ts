import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { courseLesson } from './course-lesson';
import { user } from './user';

// Define role enum using zod for type safety
export const questionTypeSchema = z.enum(['radio', 'checkbox', 'true-false']);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const courseLessonQuestionOption = z.object({
	id: z.string(),
	text: z.string(),
	isCorrect: z.boolean()
});

export type CourseLessonQuestionOption = z.infer<
	typeof courseLessonQuestionOption
>;

export const courseLessonQuestion = sqliteTable('course_lesson_question', {
	id: text('id').primaryKey(),
	lessonId: text('lesson_id'),
	questionOrder: integer('question_order').notNull(), // Order within the lesson
	type: text('type', { enum: questionTypeSchema.options }).notNull(),
	title: text('title').notNull(),
	options: text('options', { mode: 'json' })
		.$type<CourseLessonQuestionOption[]>()
		.notNull(), // JSON string with question details
	explanationHtml: text('explanation_html'),
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by'),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by'),
	deletedAt: text('deleted_at').default(sql`NULL`), // Soft delete
	deletedBy: integer('deleted_by')
});

export const courseLessonQuestionRelations = relations(
	courseLessonQuestion,
	({ one }) => ({
		courseLesson: one(courseLesson, {
			fields: [courseLessonQuestion.lessonId],
			references: [courseLesson.id]
		}),
		createdByUser: one(user, {
			fields: [courseLessonQuestion.createdBy],
			references: [user.id]
		}),
		updatedByUser: one(user, {
			fields: [courseLessonQuestion.updatedBy],
			references: [user.id]
		})
	})
);

// Add a unique constraint to ensure question_order is unique within each lesson
export const courseLessonQuestionConstraints = {
	uniqueQuestionOrderPerLesson: {
		name: 'unique_question_order_per_lesson',
		columns: [courseLessonQuestion.lessonId, courseLessonQuestion.questionOrder]
	}
};

export const courseLessonQuestionSelectSchema = createSelectSchema(
	courseLessonQuestion,
	{
		id: schema => schema.uuid(),
		lessonId: schema => schema.uuid(),
		questionOrder: schema => schema.positive(),
		type: () => questionTypeSchema,
		title: schema => schema.max(512),
		explanationHtml: schema => schema.optional(),
		createdAt: schema => schema.datetime(),
		updatedAt: schema => schema.datetime(),
		deletedAt: schema => schema.datetime().optional()
	}
);
export type CourseLessonQuestion = z.infer<
	typeof courseLessonQuestionSelectSchema
>;
export const courseLessonQuestionInsertSchema = createInsertSchema(
	courseLessonQuestion,
	{
		id: schema => schema.uuid(),
		lessonId: schema => schema.uuid(),
		questionOrder: schema => schema.positive(),
		type: () => questionTypeSchema,
		title: schema => schema.max(512),
		explanationHtml: schema => schema.optional(),
		createdAt: schema => schema.datetime().optional(),
		createdBy: schema => schema.optional(),
		updatedAt: schema => schema.datetime().optional(),
		updatedBy: schema => schema.optional(),
		deletedAt: schema => schema.datetime().optional(),
		deletedBy: schema => schema.optional()
	}
);
export type NewCourseLessonQuestion = z.infer<
	typeof courseLessonQuestionInsertSchema
>;
