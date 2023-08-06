USE DENTALCLINIC
GO
CREATE TRIGGER determine_USER_DENTAL
ON USER_DENTAL
AFTER INSERT
AS
BEGIN
	DECLARE @usertype VARCHAR(7)
	DECLARE @userid INT

	SELECT @usertype=UserType, @userid=ID FROM Inserted

	IF (@usertype='DENTIST')
	BEGIN
		INSERT INTO DENTIST (DentistID)
		VALUES (@userid)
	END

	ELSE IF (@usertype='STAFF')
	BEGIN
		INSERT INTO STAFF (StaffID)
		VALUES (@userid)
	END

	ELSE IF (@usertype='ADMIN')
	BEGIN
		INSERT INTO AD (AdID)
		VALUES (@userid)
	END

	ELSE 
	BEGIN
		ROLLBACK
		RAISERROR('Do not exist that user',15,1)
	END
END

GO