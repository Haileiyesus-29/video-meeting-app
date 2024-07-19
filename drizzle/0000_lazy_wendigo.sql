CREATE TABLE `groupMembers` (
	`groupId` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY DEFAULT '2e3e8b4e-6ab0-45ab-8e8f-d641f05c418d' NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`adminId` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`adminId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `meetingAttendees` (
	`meetingId` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`meetingId`) REFERENCES `meetings`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `meetings` (
	`id` text PRIMARY KEY DEFAULT '881769e1-59b4-4c72-8e2b-7f73b1484130' NOT NULL,
	`groupId` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`admin` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`admin`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT '19ee9afa-61c1-4a32-a06a-81187546d1ec' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);