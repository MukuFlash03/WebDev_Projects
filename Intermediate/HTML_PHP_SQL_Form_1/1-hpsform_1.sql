CREATE TABLE `hpsForm_1` (
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `hpsForm_1`
  ADD PRIMARY KEY (`email`);