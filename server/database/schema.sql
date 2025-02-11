CREATE TABLE games (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  game_name VARCHAR(100) NOT NULL,
  source VARCHAR(255) NOT NULL
);

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
  registration_date VARCHAR(30) NULL,
  role ENUM('user', 'boss') DEFAULT 'user'
);

CREATE TABLE scores (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  users_id INT NOT NULL,
  user_points INT NULL,
  game_max_score_id INT DEFAULT NULL,
  game_max_score INT DEFAULT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (game_max_score_id) REFERENCES games(id)
);

CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  article_name VARCHAR(100) NOT NULL,
  debpoints INT NOT NULL,
  parts INT NOT NULL,
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
  (1, 'Raphael', 'Riviere', 'raphaelriviere87@gmail.com', 'test1234', '0663778677', '13 rue des estivenques', '30660', 'Gallargues le Montueux', 'France', '../public/assets/images/favicon.png', '1987-10-14', '2025-01-15', 'boss'),
  (2, 'Emma', 'Durand', 'emma.durand@example.com', 'emma', '0654789654', '5 rue Lafayette', '75009', 'Paris', 'France', '../public/assets/images/emma.png', '1992-06-25', '2025-01-16', 'user'),
  (3, 'Lucas', 'Moreau', 'lucas.moreau@example.com', 'lucas', '0678954123', '18 avenue de la République', '69003', 'Lyon', 'France', '../public/assets/images/lucas.png', '1985-12-10', '2025-01-17', 'user'),
  (4, 'Sophie', 'Bernard', 'sophie.bernard@example.com', 'sophie', '0645789321', '42 boulevard Haussmann', '75008', 'Paris', 'France', '../public/assets/images/sophie.png', '1998-03-14', '2025-01-18', 'user'),
  (5, 'Thomas', 'Lefevre', 'thomas.lefevre@example.com', 'thomas', '0689745123', '10 rue de la Paix', '44000', 'Nantes', 'France', '../public/assets/images/thomas.png', '1990-09-22', '2025-01-19', 'user'),
  (6, 'Camille', 'Martin', 'camille.martin@example.com', 'camille', '0632587412', '28 rue du Château', '33000', 'Bordeaux', 'France', '../public/assets/images/camille.png', '1995-07-30', '2025-01-20', 'user');

-- Inserts dans Scores


-- Inserts dans Articles
INSERT INTO articles (id, article_name, debpoints, parts, description)
VALUES
  (1, 'Buy for 100 points', 100, 1, 'Exchange for 1 part in Arcadia PlayStore'),
  (2, 'Buy for 500 points', 500, 5, 'Exchange for 5 parts in Arcadia PlayStore'),
  (3, 'Buy for 1000 points', 1000, 10, 'Exchange for 10 parts in Arcadia PlayStore'),
  (4, 'Buy for 2000 points', 2000, 20, 'Exchange for 20 parts in Arcadia PlayStore'),
  (5, 'Buy for 5000 points', 5000, 50, 'Exchange for 50 parts in Arcadia PlayStore'),
  (6, 'Buy for 10k points', 10000, 100, 'Exchange for 100 parts in Arcadia PlayStore'),
  (7, 'Buy for 20k points', 20000, 200, 'Exchange for 200 parts in Arcadia PlayStore'),
  (8, 'Buy for 50k points', 50000, 500, 'Exchange for 500 parts in Arcadia PlayStore'),
  (9, 'Buy for 100k points', 100000, 1, 'One month free in Arcadia PlayStore');

-- Inserts dans Games
INSERT INTO games (id, game_name, source)
VALUES
  (1, "Walking Hell", "../client/src/components/games/WalkingHell.tsx"),
  (2, "Meteorite", "../client/src/components/games/Meteorite.tsx"),
  (3, "Shoot Alien", "../client/src/components/games/ShootAlien.tsx"),
  (4, "Walking Hell", "../client/src/components/games/WalkingHell.tsx"),
  (5, "Meteorite", "../client/src/components/games/Meteorite.tsx"),
  (6, "Shoot Alien", "../client/src/components/games/ShootAlien.tsx"),
  (7, "Walking Hell", "../client/src/components/games/WalkingHell.tsx"),
  (8, "Meteorite", "../client/src/components/games/Meteorite.tsx"),
  (9, "Shoot Alien", "../client/src/components/games/ShootAlien.tsx");

-- Inserts dans Rewards
INSERT INTO rewards (id, article_id, user_id, exchange_date, transaction_number)
VALUES
  (1, 1, 1, "2025-01-15", "202501150001");

  -- Inserts dans Scores
INSERT INTO scores (id, users_id, user_points, game_max_score_id, game_max_score)
VALUES
  (1, 1, 50000, NULL, 0),
  (2, 2, 34000, NULL, 0), 
  (3, 3, 75450, NULL, 0), 
  (4, 4, 14570, NULL, 0), 
  (5, 5, 123450, NULL, 0), 
  (6, 6, 256986, NULL, 0); 
