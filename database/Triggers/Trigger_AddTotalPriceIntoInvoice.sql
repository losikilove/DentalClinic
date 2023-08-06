USE DENTALCLINIC
GO
CREATE TRIGGER addTotalPriceInto_INVOICE
ON INVOICE
AFTER INSERT
AS
BEGIN
	DECLARE @totalTeethPrice INT
	DECLARE @totalMedicinePrice INT
	DECLARE @selectTreatment INT
	DECLARE @invoice INT
	DECLARE @mode INT

	--Get the invoice id and the select treatment id from Inserted [INVOICE]
	SELECT @mode=Mode, @invoice=ID, @selectTreatment=SelectTreatment FROM Inserted

	--Get the total teeth price which is sum of whole teeth price of above select treatment id
	--from [SELECT_TOOTH] table
	SELECT @totalTeethPrice=SUM(ToothPrice) FROM SELECT_TOOTH WHERE SelectTreatment=@selectTreatment

	--Set total tooth price to above total teeth price in [INVOICE] table
	UPDATE INVOICE
	SET TotalToothPrice = @totalTeethPrice
	WHERE ID = @invoice

	--Get the total medicine price which is sum of whole medicine prices of above select treatment id
	--from [DETAIL_MEDICINE] table
	SELECT @totalMedicinePrice=SUM(EstimatePrice) FROM DETAIL_MEDICINE WHERE SelectTreatment=@selectTreatment

	--Set total medicine price to above total medicine price in [INVOICE] table
	UPDATE INVOICE
	SET TotalPriceMedicine = @totalMedicinePrice
	WHERE ID = @invoice

	--Set total price to be (current total medicine price + total teeth price) in [INVOICE] table
	DECLARE @totalPrice INT
	SET @totalPrice = @totalMedicinePrice + @totalTeethPrice

	UPDATE INVOICE
	SET TotalPrice = @totalPrice
	WHERE ID = @invoice

	--Mode is on cash => change can differ 0 buck
	DECLARE @modeIsOnCash INT
	SET @modeIsOnCash = 1

	IF (@mode = @modeIsOnCash)
		BEGIN 
			UPDATE dbo.INVOICE
			SET Change = CusPaid - @totalPrice
			WHERE ID = @invoice
		END
	ELSE
		BEGIN
			UPDATE dbo.INVOICE
			SET CusPaid = @totalPrice
			WHERE ID = @invoice

			UPDATE dbo.INVOICE
			SET Change = 0
			WHERE ID = @invoice
		END
END