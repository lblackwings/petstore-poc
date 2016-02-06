DROP SEQUENCE IF EXISTS SEQ_PET;
CREATE SEQUENCE SEQ_PET
MINVALUE 100
START WITH 100
INCREMENT BY 1
CACHE 10;

DROP SEQUENCE IF EXISTS SEQ_CAT;
CREATE SEQUENCE SEQ_CAT
MINVALUE 100
START WITH 100
INCREMENT BY 1
CACHE 10;

DROP SEQUENCE IF EXISTS SEQ_TAG;
CREATE SEQUENCE SEQ_TAG
MINVALUE 100
START WITH 100
INCREMENT BY 1
CACHE 10;

DROP SEQUENCE IF EXISTS SEQ_PHOTO;
CREATE SEQUENCE SEQ_PHOTO
MINVALUE 100
START WITH 100
INCREMENT BY 1
CACHE 10;

DROP SEQUENCE IF EXISTS SEQ_USERS;
CREATE SEQUENCE SEQ_USERS
MINVALUE 100
START WITH 100
INCREMENT BY 1
CACHE 10;

DROP SEQUENCE IF EXISTS SEQ_PERM;
CREATE SEQUENCE SEQ_PERM
MINVALUE 100
START WITH 100
INCREMENT BY 1
CACHE 10;

DROP TABLE IF EXISTS PET;
CREATE TABLE PET (
  ID BIGINT DEFAULT NEXTVAL('SEQ_PET') CONSTRAINT PK_ID_PET PRIMARY KEY,
  NAME VARCHAR(255),
  STATUS VARCHAR(50) DEFAULT 'available'
);

DROP TABLE IF EXISTS CATEGORY;
CREATE TABLE CATEGORY (
  ID BIGINT DEFAULT NEXTVAL('SEQ_CAT') CONSTRAINT PK_ID_CAT PRIMARY KEY,
  NAME VARCHAR(100), UNIQUE (NAME)
);

DROP TABLE IF EXISTS TAG;
CREATE TABLE TAG (
  ID BIGINT DEFAULT NEXTVAL('SEQ_TAG') CONSTRAINT PK_ID_TAG PRIMARY KEY,
  NAME VARCHAR(100), UNIQUE (NAME)
);

DROP TABLE IF EXISTS PET_CATEGORY;
CREATE TABLE PET_CATEGORY (
	PET_ID BIGINT,
  CAT_ID BIGINT,
	FOREIGN KEY (PET_ID) REFERENCES PET(ID),
	FOREIGN KEY (CAT_ID) REFERENCES CATEGORY(ID)
);

DROP TABLE IF EXISTS PET_TAG;
CREATE TABLE PET_TAG (
	PET_ID BIGINT,
  TAG_ID BIGINT,
	FOREIGN KEY (PET_ID) REFERENCES PET(ID),
	FOREIGN KEY (TAG_ID) REFERENCES TAG(ID)
);

DROP TABLE IF EXISTS PHOTO_URL;
CREATE TABLE PHOTO_URL (
	ID BIGINT DEFAULT NEXTVAL('SEQ_PHOTO') CONSTRAINT PK_ID_PHOTO PRIMARY KEY,
	URL VARCHAR(500),
	PET_ID BIGINT,
  FOREIGN KEY (PET_ID) REFERENCES PET(ID)
);

DROP TABLE IF EXISTS USERS;
CREATE TABLE USERS (
	ID BIGINT DEFAULT NEXTVAL('SEQ_USERS') CONSTRAINT PK_ID_USERS PRIMARY KEY,
  USERNAME VARCHAR(100),
  PASSWORD VARCHAR(100),
  ENABLED BOOLEAN default true,
  FIRSTNAME VARCHAR(50),
  LASTNAME VARCHAR(50),
  EMAIL VARCHAR(100)
);

DROP TABLE IF EXISTS PERMISSION;
CREATE TABLE PERMISSION (
	ID BIGINT DEFAULT NEXTVAL('SEQ_PERM') CONSTRAINT PK_ID_PERM PRIMARY KEY,
	NAME VARCHAR(500)
);

DROP TABLE IF EXISTS USER_PERM;
CREATE TABLE USER_PERM (
	USER_ID BIGINT,
  PERM_ID BIGINT,
	FOREIGN KEY (USER_ID) REFERENCES USERS(ID),
	FOREIGN KEY (PERM_ID) REFERENCES PERMISSION(ID)
);