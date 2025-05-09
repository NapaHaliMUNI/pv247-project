CREATE TABLE `course_lesson_question` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lesson_id` integer NOT NULL,
	`question_order` integer NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`question_data` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer NOT NULL,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `course_lesson` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`course_id` integer NOT NULL,
	`lesson_order` integer NOT NULL,
	`title` text NOT NULL,
	`theory` text NOT NULL,
	`video_url` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer NOT NULL,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_lesson_order_per_course` ON `course_lesson` (`course_id`,`lesson_order`);--> statement-breakpoint
CREATE TABLE `course` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`short_description` text NOT NULL,
	`long_description` text NOT NULL,
	`difficulty` text NOT NULL,
	`duration` text NOT NULL,
	`prerequisite_id` integer,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer NOT NULL,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer NOT NULL,
	FOREIGN KEY (`prerequisite_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`prefix` integer DEFAULT 1 NOT NULL,
	`priority` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer NOT NULL,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);--> statement-breakpoint
CREATE TABLE `user_courses` (
	`user_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	`current_lesson_id` integer,
	`completed` integer DEFAULT false NOT NULL,
	`enrolled_at` text DEFAULT (CURRENT_DATE),
	`completed_at` text,
	`last_accessed_at` text DEFAULT (CURRENT_DATE),
	PRIMARY KEY(`user_id`, `course_id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`user_id` integer NOT NULL,
	`role_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`updated_at` text DEFAULT (CURRENT_DATE),
	PRIMARY KEY(`user_id`, `role_id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`updated_at` text DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);