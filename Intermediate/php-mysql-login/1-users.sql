CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(128) NOT NULL,
  `user_status` varchar(1) NOT NULL DEFAULT 'P',
  `user_data` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD KEY `user_name` (`user_name`),
  ADD KEY `user_status` (`user_status`);

ALTER TABLE `users` CHANGE `user_id` `user_id` INT(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_status`, `user_data`) VALUES
(1, 'John Doe', 'john@doe.com', '$2y$10$eGdnkD1EcFdLmPtm0eqQ8OqjjRo6NWrXKDmbieFPKHmRUTmz7iYzi', 'A', null);