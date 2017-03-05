CREATE TABLE tasks(
id SERIAL PRIMARY KEY,
task_name varchar(64) NOT NULL,
details varchar(80) NOT NULL,
due_date varchar(40) NOT NULL,
complete varchar(20));
