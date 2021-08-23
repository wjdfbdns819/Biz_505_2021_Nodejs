-- % : 어디에서나 접근가능
drop user 'node';

CREATE USER 'node'@'%'
identified by '12341234';

GRANT ALL privileges ON *.*
TO 'node'@'%';

CREATE DATABASE nodeDB;

USE nodedb;
DESC tbl_bbs;

DROP TABLE tbl_bbs;

SELECT * FROM tbl_bbs;
