CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password varchar(15) NOT NULL,
  tel_num VARCHAR(15) DEFAULT NULL, 
  address VARCHAR(100) NULL,
  zipcode VARCHAR(10) NULL, 
  city VARCHAR(50) NULL,
  country VARCHAR(40) NULL,
  picture VARCHAR(200) NULL,
  birthdate VARCHAR(30) NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role ENUM('user', 'boss') DEFAULT 'user'
);


CREATE TABLE scores (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  users_id INT NOT NULL,
  game_max_score_id INT NOT NULL,
  game_max_score INT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id)
);


CREATE TABLE games (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  game_name VARCHAR(100) NOT NULL
);


CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  article_name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL
);

-- Table Rewards
CREATE TABLE rewards (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  article_id INT NOT NULL,
  user_id INT NOT NULL,
  exchange_date DATE NOT NULL,
  transaction_number VARCHAR(100) NOT NULL,
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inserts dans Users
INSERT INTO users (id, firstname, lastname, email, password, tel_num, address, zipcode, city, country, picture, birthdate, registration_date, role)
VALUES
  (1, "Raphael", "Riviere", "raphaelriviere87@gmail.com", "raphael974", "0663778677", "13 rue des estivenques", "30660", "Gallargues le Montueux", "France", "../public/assets/images/favicon.png", "1987-10-14", "2025-01-15", "boss");

-- Inserts dans Scores
INSERT INTO scores (id, users_id, game_max_score_id, game_max_score)
VALUES
  (1, 1, 10000, 200);

-- Inserts dans Articles
INSERT INTO articles (id, article_name, description)
VALUES
  (1, "bon n°1", "Echange de 500 points contre 1 partie chez Arcadia Palace"),
  (2, "bon n°2", "Echange de 1200 points contre 2 parties chez Arcadia Palace"),
  (3, "bon n°3", "Echange de 3000 points contre 4 parties chez Arcadia Palace");

-- Inserts dans Games
INSERT INTO games (id, game_name)
VALUES
  (1, "Walking Hell"),
  (2, "Meteoritel");

-- Inserts dans Rewards
INSERT INTO rewards (id, article_id, user_id, exchange_date, transaction_number)
VALUES
  (1, 1, 1, "2025-01-15", "202501150001");
