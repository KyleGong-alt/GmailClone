-- --
-- -- All SQL statements must be on a single line and end in a semicolon.
-- --

DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

DROP TABLE IF EXISTS userinfo;
-- CREATE TABLE userinfo(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), username VARCHAR(32), passwords VARCHAR(32));
CREATE TABLE userinfo(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),username VARCHAR(32), pass VARCHAR(64));

DROP TABLE IF EXISTS mail;
CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), sendto VARCHAR(32), favorite INT, viewed INT, sentfromemail VARCHAR(32), sentfrom VARCHAR(32), mail jsonb);

-- -- Your database schema goes here --

