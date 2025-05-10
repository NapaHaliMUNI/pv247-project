CREATE TABLE `course_lesson_question` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text,
	`question_order` integer NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`options` text NOT NULL,
	`explanation_html` text,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer,
	`deleted_at` text DEFAULT NULL,
	`deleted_by` integer
);
--> statement-breakpoint
CREATE TABLE `course_lesson` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text,
	`lesson_order` integer NOT NULL,
	`title` text NOT NULL,
	`content_html` text NOT NULL,
	`video_url` text,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer,
	`deleted_at` text DEFAULT NULL,
	`deleted_by` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_lesson_order_per_course` ON `course_lesson` (`course_id`,`lesson_order`);--> statement-breakpoint
CREATE TABLE `course_prerequisites` (
	`course_id` text NOT NULL,
	`prerequisite_course_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`updated_at` text DEFAULT (CURRENT_DATE),
	`deleted_at` text DEFAULT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_course_prerequisite` ON `course_prerequisites` (`course_id`,`prerequisite_course_id`);--> statement-breakpoint
CREATE TABLE `course` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`image_url` text,
	`short_description` text NOT NULL,
	`long_description` text NOT NULL,
	`category` text,
	`difficulty` text,
	`duration` text,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer,
	`deleted_at` text DEFAULT NULL,
	`deleted_by` integer
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	`created_by` integer,
	`updated_at` text DEFAULT (CURRENT_DATE),
	`updated_by` integer,
	`deleted_at` text DEFAULT NULL,
	`deleted_by` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);--> statement-breakpoint
CREATE TABLE `test` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_courses` (
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`current_lesson_id` text,
	`created_at` text DEFAULT (CURRENT_DATE),
	`completed_at` text DEFAULT NULL,
	PRIMARY KEY(`user_id`, `course_id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`user_id` text NOT NULL,
	`role_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_DATE),
	PRIMARY KEY(`user_id`, `role_id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`avatar_url` text,
	`created_at` text DEFAULT (CURRENT_DATE),
	`updated_at` text DEFAULT (CURRENT_DATE),
	`deleted_at` text DEFAULT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);