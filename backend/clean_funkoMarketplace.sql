-- Eliminar relaciones dependientes primero
DELETE FROM order_details;
DELETE FROM orders;
DELETE FROM cart;
DELETE FROM favorites;
DELETE FROM product_tags;

-- Luego las entidades independientes
DELETE FROM tags;
DELETE FROM products;
DELETE FROM users;


-- Reiniciar secuencias
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE tags_id_seq RESTART WITH 1;
ALTER SEQUENCE cart_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;