CREATE DATABASE shoppinglist;

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    created_at timestamptz DEFAULT Now()
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    created_at timestamptz DEFAULT Now()
);

INSERT INTO items (item_name) VALUES ('apples');
INSERT INTO items (item_name) VALUES ('oranges');
INSERT INTO items (item_name) VALUES ('carrots');