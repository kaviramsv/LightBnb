-- select count(*) from  (SELECT city,count(reservations.*) as num_reservations
-- FROM properties
-- JOIN reservations ON reservations.property_id = properties.id
-- GROUP BY city
-- ORDER BY num_reservations DESC) as name;


select count(*) from  (SELECT properties.city, count(reservations) as total_reservations
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY properties.city
ORDER BY total_reservations DESC) as name;