import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { z } from 'zod';

import { courseLesson } from './course-lesson';
import { user } from './user';

// Define role enum using zod for type safety
export const questionTypeSchema = z.enum(['radio', 'checkbox', 'true-false']);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const courseQuestionOption = z.object({
	id: z.number(),
	text: z.string(),
	isCorrect: z.boolean()
});

export type CourseQuestionOption = z.infer<typeof courseQuestionOption>;

export const courseLessonQuestion = sqliteTable('course_lesson_question', {
	id: text('id').primaryKey(),
	lessonId: text('lesson_id'),
	questionOrder: integer('question_order').notNull(), // Order within the lesson
	type: text('type', { enum: questionTypeSchema.options }).notNull(),
	title: text('title').notNull(),
	options: text('options', { mode: 'json' })
		.$type<CourseQuestionOption[]>()
		.notNull(), // JSON string with question details
	explanation: text('explanation'),
	createdAt: text('created_at').default(sql`(CURRENT_DATE)`),
	createdBy: integer('created_by'),
	updatedAt: text('updated_at').default(sql`(CURRENT_DATE)`),
	updatedBy: integer('updated_by')
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

export type CourseLessonQuestion = typeof courseLessonQuestion.$inferSelect;
export type NewCourseLessonQuestion = typeof courseLessonQuestion.$inferInsert;
