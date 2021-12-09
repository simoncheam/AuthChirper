
## Table Setup

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


## StoredProcedures Setup


// get_one_by_id -- SP #1
### spGetChirpById(?)

CALL spGetChirpById();

DELIMITER //
CREATE PROCEDURE spGetChirpById(spchirpid INT)
	BEGIN
		SELECT ChirpTags.chirpid as chirp_id, ChirpTags.tagid as tag_id,
        c.content as content, c._created as chirp_created, c.location as location,
        u.name as u_name, u.email as u_email, 
        t.name as tag_name, t._created as tag_created 
        FROM ChirpTags
            JOIN Tags t
            ON t.id=ChirpTags.tagid
                JOIN Chirps c
                ON c.id=ChirpTags.chirpid
                    JOIN Users u
                    ON c.userid=u.id
                    WHERE ChirpTags.chirpid=spchirpid;
    END //
DELIMITER //;


// get_all_by_tagid -- SP #2
### spGetChirpsByTagId(?)

CALL spGetChirpsByTagId();

DELIMITER //
CREATE PROCEDURE spGetChirpsByTagId(sptagid INT)
	BEGIN
    SELECT ChirpTags.chirpid as chirp_id, ChirpTags.tagid as tag_id, c.content as content, c._created as chirp_created,
u.name as u_name, u.email as u_email, t.name as tag_name, t._created as tag_created 
FROM ChirpTags
JOIN Tags t
ON t.id=ChirpTags.tagid
JOIN Chirps c
ON c.id=ChirpTags.chirpid
JOIN Users u
ON c.userid=u.id
WHERE ChirpTags.tagid=sptagid
ORDER BY c._created DESC;
END //
DELIMITER //;



// get_all_by_userid -- SP #3

### spGetChirpsByUserId();

DELIMITER //
CREATE PROCEDURE spGetChirpsByUserId(spuserid INT)
BEGIN
	SELECT ChirpTags.chirpid as chirp_id, ChirpTags.tagid as tag_id , c.content as content, c._created as chirp_created,
		Users.id as u_id, Users.name as u_name, Users.email as u_email, t.name as tag_name, t._created as tag_created 
		FROM ChirpTags
		JOIN Tags t
		ON t.id=ChirpTags.tagid
		JOIN Chirps c
		ON c.id=ChirpTags.chirpid
		JOIN Users
		ON c.userid=Users.id
			WHERE Users.id=spuserid
            ORDER BY c._created DESC;
END//
DELIMITER //;
