CREATE TABLE `acitivites` (
	`id` integer NOT NULL,
	`album_id` integer,
	`comment_id` integer,
	`repliedToUserId` integer,
	`like_id` integer,
	`photo_id` integer,
	`type` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`repliedToUserId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`like_id`) REFERENCES `likes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`photo_id`) REFERENCES `photos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `acitivites_id_unique` ON `acitivites` (`id`);--> statement-breakpoint
CREATE TABLE `albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_id` integer NOT NULL,
	`circle_id` integer,
	`name` text NOT NULL,
	`like_count` integer DEFAULT 0 NOT NULL,
	`latitude` text,
	`longitude` text,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`circle_id`) REFERENCES `circles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `albums_id_unique` ON `albums` (`id`);--> statement-breakpoint
CREATE TABLE `circleInvites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`circle_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`circle_id`) REFERENCES `circles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `circleInvites_id_unique` ON `circleInvites` (`id`);--> statement-breakpoint
CREATE TABLE `circles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner_id` integer NOT NULL,
	`name` text NOT NULL,
	`picture` text,
	`is_public` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `circles_id_unique` ON `circles` (`id`);--> statement-breakpoint
CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`album_id` integer NOT NULL,
	`message` text NOT NULL,
	`like_count` integer DEFAULT 0 NOT NULL,
	`parent_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `comments_id_unique` ON `comments` (`id`);--> statement-breakpoint
CREATE TABLE `friendRequests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`requester_id` integer NOT NULL,
	`requestee_id` integer NOT NULL,
	FOREIGN KEY (`requester_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`requestee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friendRequests_id_unique` ON `friendRequests` (`id`);--> statement-breakpoint
CREATE TABLE `friends` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`friend_one_id` integer NOT NULL,
	`friend_two_id` integer NOT NULL,
	FOREIGN KEY (`friend_one_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`friend_two_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friends_id_unique` ON `friends` (`id`);--> statement-breakpoint
CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`album_id` integer,
	`comment_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `likes_id_unique` ON `likes` (`id`);--> statement-breakpoint
CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`album_id` integer NOT NULL,
	`src` text NOT NULL,
	`latitude` text,
	`longitude` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `photos_id_unique` ON `photos` (`id`);--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`creator_id` integer NOT NULL,
	`circle_id` integer NOT NULL,
	`access_token` text NOT NULL,
	`expires_at` integer DEFAULT (unixepoch() + 7 * 24 * 60 *60) NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`circle_id`) REFERENCES `circles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tokens_id_unique` ON `tokens` (`id`);--> statement-breakpoint
CREATE TABLE `userCircle` (
	`user_id` integer NOT NULL,
	`circle_id` integer NOT NULL,
	`mod` integer DEFAULT false NOT NULL,
	PRIMARY KEY(`user_id`, `circle_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`circle_id`) REFERENCES `circles`(`id`) ON UPDATE no action ON DELETE cascade
);
