CREATE DATABASE nestjs_cars_exam;

\c nestjs_cars_exam

--student
DROP TABLE IF EXISTS users ;

CREATE TABLE users(
    "id" VARCHAR PRIMARY KEY DEFAULT  uuid_generate_v4 (),
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "email" VARCHAR UNIQUE NOT NULL,
    "password" TEXT  NOT NULL,
    "img" TEXT  NOT NULL DEFAULT 'http://blalalalal',
    "role" VARCHAR(50) NOT NULL DEFAULT 'user'
);
INSERT INTO users(firstname,lastname,email,password,role) VALUES('ziyadem','Maxkamova','ziyadem@gmail.com','$2b$12$UXhdRhqa7YzS0GsrBgAHVef7Mr8fnZucK4fttKzRapFpyGao.8VeW','admin') ;
select * from users;

--model
DROP TABLE IF EXISTS model cascade;
CREATE TABLE model(
    "id" VARCHAR PRIMARY KEY DEFAULT  uuid_generate_v4 (),
    "marka" VARCHAR(100) UNIQUE NOT NULL,
    "img" TEXT  NOT NULL DEFAULT 'http://blalalalal'
);
INSERT INTO model(marka,img) VALUES('chevrolet','http://blalalalal');
INSERT INTO model(marka,img) VALUES('lada','http://blalalalal');
INSERT INTO model(marka,img) VALUES('lombargini','http://blalalalal');
select * from model;


--cars
DROP TABLE IF EXISTS cars cascade;
CREATE TABLE cars(
    "id" VARCHAR PRIMARY KEY DEFAULT  uuid_generate_v4 (),
    "title" VARCHAR(100) UNIQUE NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "tanirovka" BOOLEAN,
    "motor" VARCHAR(50) not null,
    "year" int not null,
    "color" VARCHAR(50) not null,
    "distance" VARCHAR (50) not null,
    "gearbook" VARCHAR(50) not null,
    "description" text not null,
    "narx" bigint not null,
    "img_model" TEXT  NOT NULL DEFAULT 'http://blalalalal',
    "img_ichki" TEXT  NOT NULL DEFAULT 'http://blalalalal',
    "img_tashqi" TEXT  NOT NULL DEFAULT 'http://blalalalal',
    CONSTRAINT model_car
    FOREIGN KEY(model) 
	REFERENCES model(id)
);
INSERT INTO cars(model,title,tanirovka,motor,year,color,distance,gearbook,description,narx,img_model,img_ichki,img_tashqi) 
VALUES('bf83d362-880e-41d4-8221-631116a5db54','malibu',true,1.60,2023,'black','3000 km','Avtomat karobka','hullas zor...',300000,'https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg','https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg','https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg');
INSERT INTO cars(model,title,tanirovka,motor,year,color,distance,gearbook,description,narx,img_model,img_ichki,img_tashqi) 
VALUES('bf83d362-880e-41d4-8221-631116a5db54','malibu1',true,1.60,2023,'black','3000 km','Avtomat karobka','hullas zor...',300000,'https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg','https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg','https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg');
INSERT INTO cars(model,title,tanirovka,motor,year,color,distance,gearbook,description,narx,img_model,img_ichki,img_tashqi) 
VALUES('bf83d362-880e-41d4-8221-631116a5db54','malibu2',true,1.60,2023,'black','3000 km','Avtomat karobka','hullas zor...',300000,'https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg','https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg','https://res.cloudinary.com/dsv0yl7sh/image/upload/v1684941146/exam_three_folder/vjinedbfturezigf4yjg.jpg');


select * from cars;



--karzinka
DROP TABLE IF EXISTS karzinka ;
CREATE TABLE karzinka(
    "id" VARCHAR  NOT NULL DEFAULT uuid_generate_v4 (),
    "user_id" VARCHAR(100)  NOT NULL,
    "car_id" VARCHAR(100) NOT NULL,
    "car_user" VARCHAR(100) UNIQUE NOT NULL,
    CONSTRAINT karzinka_car
    FOREIGN KEY(car_id) 
	REFERENCES cars(id),
    CONSTRAINT karzinka_user
    FOREIGN KEY(user_id) 
	REFERENCES users(id)
);
INSERT INTO karzinka(user_id,car_id,car_user) VALUES('d0ebb02e-483d-4bf7-828e-22b5df68c1e8','5e9ffcc3-db01-4228-8bec-d43162329c63','b936f5a7-511e-4359-8295-9a61c2ce083355b59598-f7f2-42bf-8270-dbd6c22c0b8d');
select * from karzinka;


--like
DROP TABLE IF EXISTS likes;
CREATE TABLE likes(
    "id" VARCHAR  NOT NULL  DEFAULT uuid_generate_v4 (),
    "user_id" VARCHAR(100)  NOT NULL,
    "car_id" VARCHAR(100) NOT NULL,
    "car_user" VARCHAR(100) UNIQUE NOT NULL,
    CONSTRAINT carLike_car
    FOREIGN KEY(car_id) 
	REFERENCES cars(id),
    CONSTRAINT carLike_user
    FOREIGN KEY(user_id) 
	REFERENCES users(id)
);
INSERT INTO likes(user_id,car_id,car_user) VALUES('9cef96fb-6fd8-4c6b-8356-d988c73a825d','5e9ffcc3-db01-4228-8bec-d43162329c63','b936f5a7-511e-4359-8295-9a61c2ce083355b59598-f7f2-42bf-8270-dbd6c22c0b8d');
select * from likes;


DELETE FROM model
USING cars
WHERE model.id='6202021c-1bdf-4c38-ac63-48cc1528a168';
RETURNING model.id;

DELETE FROM table_name1
USING table_expression
WHERE condition
RETURNING returning_columns;
DELETE FROM users
USING cars,model,likes
WHERE users.id='eaf9d02e-1e68-465d-963e-3de576032be4' and users.id=likes.user_id and likes.car_id=cars.id and  cars.model = model.id ;



DELETE 
FROM users as u 
USING  karzinka as k,likes as l  
WHERE (u.id=k.user_id) AND  (l.user_id=u.id) AND  u.id='d0ebb02e-483d-4bf7-828e-22b5df68c1e8';


DELETE FROM model 
USING  cars 
WHERE model.id=cars.model
AND  model.id='86bacc0b-b683-4652-b6f8-dee3d5baf1d6';


DELETE FROM model where model.id='86bacc0b-b683-4652-b6f8-dee3d5baf1d6';