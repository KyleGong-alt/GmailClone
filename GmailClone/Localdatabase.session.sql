-- SELECT * FROM userinfo
-- SELECT mailbox FROM mail
SELECT * FROM mail;
-- SELECT * FROM mail WHERE id = 'b437a837-38e2-49cd-a984-fe4864bed9d0';
-- SELECT mailbox FROM mail
-- UPDATE mail set mailbox = 'sent' WHERE id = 'b437a837-38e2-49cd-a984-fe4864bed9d0';

-- UPDATE mail set viewed = 'true' WHERE id = 'b437a837-38e2-49cd-a984-fe4864bed9d0';






-- SELECT * FROM mail WHERE mailbox='drafts' AND sendto='molly@books.com';
-- Select * FROM OPENJSON (@mail)