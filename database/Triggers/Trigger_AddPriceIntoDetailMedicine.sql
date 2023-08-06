USE DENTALCLINIC
GO
CREATE TRIGGER addPriceInto_DETAIL_MEDICINE
ON DETAIL_MEDICINE
AFTER INSERT
AS
BEGIN
	DECLARE @selectTreatment INT
	DECLARE @medicine VARCHAR(50)
	DECLARE @price INT
	DECLARE @quantity INT
	
	--Get select treatment id and medicine id in inserted [DETAIL_MEDICINE] table
	SELECT @selectTreatment=SelectTreatment, @medicine=Medicine, @quantity=Quantity FROM Inserted

	--Get the current price of that medicine in MEDICINE table
	SELECT @price=CurrentPrice FROM MEDICINE WHERE Medicine=@medicine

	--Set the price of medicine which is equal to @price in [DETAIL_MEDICINE] table
	UPDATE DETAIL_MEDICINE
	SET MedicinePrice = @price
	WHERE SelectTreatment=@selectTreatment AND Medicine=@medicine

	--Set the estimate price of medicine to be equal to (its @quantity * its @price) in [DETAIL_MEDICINE] table
	UPDATE DETAIL_MEDICINE
	SET EstimatePrice = @price * @quantity
	WHERE SelectTreatment=@selectTreatment AND Medicine=@medicine
END