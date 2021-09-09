#! /bin/bash
service mysql restart
mysql -u root -e "create database sampledb; GRANT ALL PRIVILEGES ON sampledb.* TO 'root'@'localhost' WITH GRANT OPTION; USE sampledb; CREATE TABLE IF NOT EXISTS users (user_id int(11) NOT NULL, user_name varchar(255) NOT NULL); INSERT INTO users (user_id, user_name) VALUES (1, 'dario'), (2, 'brayan'), (3, 'samuel')"
