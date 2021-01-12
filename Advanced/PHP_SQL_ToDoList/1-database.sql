CREATE TABLE `psTodo_1` (
  `todo_id` int(11) NOT NULL,
  `todo_task` text NOT NULL,
  `todo_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `psTodo_1`
  ADD PRIMARY KEY (`todo_id`);

ALTER TABLE `psTodo_1`
  MODIFY `todo_id` int(11) NOT NULL AUTO_INCREMENT;
