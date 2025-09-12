-- DROP TABLE IF EXISTS game;
-- CREATE TABLE IF NOT EXISTS game(
--     gameID INT UNIQUE NOT NULL AUTOINCREMENT,
--     gameName VARCHAR NOT NULL,
--     gameDescription VARCHAR,
--     dataCreated TIMESTAMP NOT NULL,
--     PRIMARY KEY (gameId)
-- );

DROP TABLE IF EXISTS rolls;
CREATE TABLE IF NOT EXISTS rolls (
    rollID SERIAL,
    roll TEXT NOT NULL,
    rollOutput TEXT NOT NULL,
    rollBreakDown TEXT NOT NULL,
    -- gameID NOT NULL,
    PRIMARY KEY (rollID)
    -- FOREIGN KEY (gameID)
);

DROP TABLE IF EXISTS files;
CREATE TABLE IF NOT EXISTS files (
    fileID SERIAL,
    filename TEXT NOT NULL,
    -- gameID INT NOT NULL,
    folder INT NOT NULL,
    timeCreated TIMESTAMP NOT NULL,
    PRIMARY KEY (fileid)
    -- FOREIGN KEY (gameID)
);

