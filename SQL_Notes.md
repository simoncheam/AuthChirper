

### Users


CREATE TABLE Users (
	id INT auto_increment PRIMARY KEY,
	name varchar(32) NOT NULL,
	email varchar(64) NOT NULL unique,
    password VARCHAR(60) NOT NULL,
	_created datetime default current_timestamp NOT NULL

);


### Chirps

CREATE TABLE Chirps (

	id INT AUTO_INCREMENT PRIMARY KEY,
	userid INT NOT NULL,
	content Text NOT NULL,
	location text NOT NULL,
	_created datetime default current_timestamp NOT NULL,
	FOREIGN KEY (userid) REFERENCES Users(id)

);



### Tags

CREATE TABLE Tags (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name varchar(32) NOT NULL unique,
	_created datetime default current_timestamp NOT NULL
);

### ChirpTags

CREATE TABLE ChirpTags (
	chirpid INT NOT NULL,
    tagid INT NOT NULL,
	FOREIGN KEY (tagid) REFERENCES Tags(id),
    FOREIGN KEY (chirpid) REFERENCES Chirps(id),
    PRIMARY KEY (chirpid, tagid)
);

<!-- Insert test data -->

INSERT INTO Users (name, email, password) VALUES ( 'Simon', 'test@test.com', 'hunter2');
INSERT INTO Chirps (id, content, userid, location) VALUES ('1', 'This is test content', '1', 'Random place');

INSERT INTO Chirps (id, content, userid, location) VALUES ('2', 'This is test content2', '1', 'Random place2');



INSERT INTO Tags (name) VALUES ('React'), ('TypeScript');
INSERT INTO ChirpTags (chirpid, tagid) VALUES (1,1), (2,1), (2,2);

-- DESCRIBE

describe Users;
describe ChirpTags;
describe Chirps;
describe Tags;
