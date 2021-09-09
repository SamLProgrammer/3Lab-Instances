#! /bin/bash
mysql -u root -pa -e "create database sanmplevideo_db; GRANT ALL PRIVILEGES ON sanmplevideo_db.* TO 'root'@'localhost' WITH GRANT OPTION"
mysql -u root -pa sanmplevideo_db < Sample-SQL-File-10rows.sql