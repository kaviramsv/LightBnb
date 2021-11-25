-- INSERT INTO users (name,email,password)
-- VALUES 
-- ('kavi','kv@sample.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
-- ('pavi','pv@sample.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
-- ('ravi','rv@sample.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
-- ('savi','sv@sample.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
-- DELETE FROM users
-- WHERE id IN (21,22,23,24) ;




-- INSERT INTO 
-- properties(owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province ,post_code)
-- VALUES
-- (1,'A1','descriptionA','url1','url2',100,3,3,3,'CA','OPUS1','KA','ON','AG2 893'),
-- (2,'B1','descriptionB','url1','url2',200,3,3,3,'CA','OPUS2','KA','ON','BG2 893'),
-- (3,'C1','descriptionC','url1','url2',300,3,3,3,'CA','OPUS3','KA','ON','CG2 893'),
-- (4,'D1','descriptionD','url1','url2',300,3,3,3,'CA','OPUS4','KA','ON','dG2 893');

-- INSERT INTO reservations (guest_id, property_id, start_date, end_date)
-- VALUES (1, 1, '2018-09-11', '2018-09-26'),
-- (2, 2, '2019-01-04', '2019-02-01'),
-- (3, 3, '2021-10-01', '2021-10-14');


INSERT INTO property_reviews (guest_id, property_id, reservation_id)
VALUES (1, 1,7 ),
(2, 2, 8 ),
(3, 3,9);