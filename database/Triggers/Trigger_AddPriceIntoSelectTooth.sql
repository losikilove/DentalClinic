USE DENTALCLINIC
GO
CREATE TRIGGER addPriceInto_SELECT_TOOTH
ON SELECT_TOOTH
AFTER INSERT
AS
BEGIN
	DECLARE @tooth INT
	DECLARE @selectTreatment INT
	DECLARE @surface CHAR(1)
	DECLARE @treatment INT
	DECLARE @price INT
	
	SELECT @tooth=Tooth, @selectTreatment=SelectTreatment, @surface=Surface FROM Inserted

	SELECT @treatment=Treatment FROM SELECT_TREATMENT WHERE ID = @selectTreatment

	SELECT @price=CurrentPrice FROM TOOTH_PRICE WHERE Treatment=@treatment AND Tooth=@tooth

	UPDATE SELECT_TOOTH
	SET ToothPrice = @price
	WHERE SelectTreatment=@selectTreatment AND Tooth=@tooth AND Surface=@surface
END

GO