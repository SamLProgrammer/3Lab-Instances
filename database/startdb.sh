#! /bin/bash
service mysql restart
mysql -u root -e "create database sanmplevideo_db; GRANT ALL PRIVILEGES ON samplevideo_db.* TO 'root'@'localhost' WITH GRANT OPTION"
mysql -u root samplevideo_db < Sample-SQL-File-10rows.sql
