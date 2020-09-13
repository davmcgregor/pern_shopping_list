CREATE DATABASE shoppinglist;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    registered_at timestamptz DEFAULT Now(),
    PRIMARY KEY(user_id)
);

CREATE TABLE items (
    item_id SERIAL,
    user_id uuid,
    item_name VARCHAR(255) NOT NULL,
    created_at timestamptz DEFAULT Now(),
    PRIMARY KEY(item_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO items (item_name) VALUES ('apples');
INSERT INTO items (item_name) VALUES ('oranges');
INSERT INTO items (item_name) VALUES ('carrots');