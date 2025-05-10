import 'dotenv/config';
import { config } from 'dotenv';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { reset, seed } from 'drizzle-seed';
import { v4 as uuidv4 } from 'uuid';

import { user } from './schema/user';
import { course } from './schema/course';
import { courseLesson } from './schema/course-lesson';
import { courseLessonQuestion } from './schema/course-lesson-question';

config({ path: '.env.development' });

const client = createClient({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!
});

const main = async () => {
	const db = drizzle(client);

	await reset(db, { user });
	await reset(db, { course });
	await reset(db, { courseLesson });
	await reset(db, { courseLessonQuestion });

	const userIds = Array.from({ length: 10 }, () => uuidv4());
	const courseIds = Array.from({ length: 10 }, () => uuidv4());
	const courseLessonIds = Array.from({ length: 10 }, () => uuidv4());

	await seed(db, { users: user }).refine(f => ({
		users: {
			count: 10,
			columns: {
				id: f.valuesFromArray({ values: courseIds, isUnique: true }),
				email: f.email(),
				username: f.firstName(),
				password: f.string(),
				avatarUrl: f.default({
					defaultValue: 'https://placehold.co/256x256.png?text=Avatar'
				}),
				createdAt: f.datetime(),
				updatedAt: f.datetime(),
				deletedAt: f.default({
					defaultValue: null
				})
			}
		}
	}));

	console.log('User seeding completed');

	await seed(db, { courses: course }).refine(f => ({
		courses: {
			count: 10,
			columns: {
				id: f.valuesFromArray({ values: courseIds, isUnique: true }),
				title: f.valuesFromArray({
					values: [
						'Course 1',
						'Course 2',
						'Course 3',
						'Course 4',
						'Course 5',
						'Course 6',
						'Course 7',
						'Course 8',
						'Course 9',
						'Course 10'
					],
					isUnique: true
				}),
				shortDescription: f.string(),
				longDescription: f.loremIpsum(),
				imageUrl: f.default({
					defaultValue: 'https://placehold.co/600x400.png?text=Course+Image'
				}),
				difficulty: f.valuesFromArray({
					values: ['Silver', 'Gold', 'Legendary Eagle', 'The Global Elite']
				}),
				duration: f.valuesFromArray({
					values: [
						'Short (10-30 minutes)',
						'Medium (30-60 minutes)',
						'Long (60+ minutes)'
					]
				}),
				category: f.valuesFromArray({
					values: [
						'Fundamentals',
						'Weapon Skills',
						'Movement',
						'Maps',
						'Utility',
						'Game Sense'
					]
				}),
				createdAt: f.datetime(),
				createdBy: f.valuesFromArray({
					values: userIds
				}),
				updatedAt: f.datetime(),
				updatedBy: f.valuesFromArray({
					values: userIds
				}),
				deletedAt: f.default({
					defaultValue: null
				}),
				deletedBy: f.default({ defaultValue: null })
			}
		}
	}));

	console.log('Course seeding completed');

	await seed(db, { courseLessons: courseLesson }).refine(f => ({
		courseLessons: {
			count: 10,
			columns: {
				id: f.valuesFromArray({ values: courseLessonIds, isUnique: true }),
				courseId: f.valuesFromArray({
					values: courseIds
				}),
				title: f.string(),
				description: f.string(),
				lessonOrder: f.intPrimaryKey(),
				createdAt: f.datetime(),
				createdBy: f.valuesFromArray({
					values: userIds
				}),
				updatedAt: f.datetime(),
				updatedBy: f.valuesFromArray({
					values: userIds
				}),
				deletedAt: f.default({
					defaultValue: null
				}),
				deletedBy: f.default({ defaultValue: null })
			}
		}
	}));

	console.log('Course Lesson seeding completed');

	await seed(db, { courseLessonQuestions: courseLessonQuestion }).refine(f => ({
		courseLessonQuestions: {
			count: 10,
			columns: {
				id: f.uuid(),
				lessonId: f.valuesFromArray({
					values: courseLessonIds
				}),
				questionOrder: f.intPrimaryKey(),
				type: f.default({
					defaultValue: 'checkbox'
				}),
				options: f.default({
					defaultValue: [
						{
							id: uuidv4(),
							text: 'Option 1',
							isCorrect: true
						},
						{
							id: uuidv4(),
							text: 'Option 2',
							isCorrect: false
						}
					]
				}),
				title: f.string(),
				explanationHtml: f.loremIpsum(),
				createdAt: f.datetime(),
				createdBy: f.valuesFromArray({
					values: userIds
				}),
				updatedAt: f.datetime(),
				updatedBy: f.valuesFromArray({
					values: userIds
				}),
				deletedAt: f.default({
					defaultValue: null
				}),
				deletedBy: f.default({ defaultValue: null })
			}
		}
	}));

	console.log('Course Lesson Question seeding completed');
};

main();
