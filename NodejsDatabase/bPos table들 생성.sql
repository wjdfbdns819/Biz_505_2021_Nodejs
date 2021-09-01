  
-- % : 어디에서나 접근가능
drop user 'node';

CREATE USER 'node'@'%'
identified by '12341234';

GRANT ALL privileges ON *.*
TO 'node'@'%';

CREATE DATABASE nodeDB;

USE nodedb;
show tables;
DESC tbl_products;

INSERT INTO tbl_products(p_code, p_name, p_price)
value 
('P0001', '1000원 김밥', '1000'),
('P0002', '참치김밥', '2500'),
('P0003', '어묵해장국', '3000'),
('P0004', '매운 떡볶이', '3500'),
('P0005', '돈까스', '4000'),
('P0006', '치즈김밥', '2500'),
('P0007', '여름 쫄면', '3500'),
('P0008', '순두부찌개', '4000'),
('P0009', '비빔냉면', '4000'),
('P0010', '마요라면', '2000');

select * from tbl_products;
select * from tbl_orders;

drop table tbl_table_orders;

