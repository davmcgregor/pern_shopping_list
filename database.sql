CREATE DATABASE shoppinglist;

CREATE TABLE items(
    item_name VARCHAR(255) NOT NULL,
    item_date   DEFAULT Now(),
);
