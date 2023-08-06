USE DENTALCLINIC
GO
--Insert fixed data into the [ROOM] table
INSERT INTO ROOM (RoomID, Floorr)
VALUES
	('R11', 1),
	('R12', 1),
	('R13', 1),
	('R14', 1),
	('R15', 1),
	('R21', 2),
	('R22', 2),
	('R23', 2),
	('R24', 2),
	('R25', 2),
	('R26', 2),
	('R31', 3),
	('R32', 3),
	('R33', 3),
	('R34', 3),
	('R35', 3),
	('R36', 3)

--Insert fixed data into the [TREATMENT] table
INSERT INTO TREATMENT (Title, Descriptionn)
VALUES
	('Cleanings', 'Keep your teeth healthy, shiny and strong'),
	('Whitening', 'Dentists use a special hydrogen peroxide gel and a special light source to whiten faster.'),
	('Extraction', 'This is almost always to prevent further again'),
	('Veneers', 'If your teeth are crooked or discoloured'),
	('Fillings', 'For most cavities'),
	('Crowns', 'If your cavity is a little too big for a filling, or the top part of your tooth has decayed'),
	('Root Canal', 'The tissue inside or under your tooth is infected and inflamed'),
	('Invisalign', 'As straighter teeth are often healthier and easier to take care of'),
	('Bonding', 'This is another way to repair damaged or chipped teeth'),
	('Dentures', 'They are meant to replace teeth in a natural way, and they’re typically removable')

--Insert fixed data into the [TOOTH] table
INSERT INTO TOOTH (ToothName)
VALUES
	('Canies'),
	('Incisors'),
	('Premolars'),
	('Molars'),
	('Wisdom Teeth')

--Insert fixed data into the [TOOTH_SURFACE] table
INSERT INTO TOOTH_SURFACE (ShortName, Fullname)
VALUES
	('L', 'Lingual'),
	('F', 'Facial'),
	('D', 'Distal'),
	('M', 'Mesial'),
	('T', 'Top'),
	('R', 'Root')

--Insert fixed data into the [TOOTH_PRICE] table
INSERT INTO TOOTH_PRICE (Treatment, Tooth, CurrentPrice)
VALUES 
	(1, 1, 2), (1, 2, 3), (1, 3, 4), (1, 4, 5),
	(2, 1, 1), (2, 2, 2), (2, 3, 3), (2, 4, 4), (2, 5, 5), --A special treatment for the wisdom tooth
	(3, 1, 5), (3, 2, 6), (3, 3, 7), (3, 4, 8),
	(4, 1, 3), (4, 2, 4), (4, 3, 5), (4, 4, 6),
	(5, 1, 2), (5, 2, 4), (5, 3, 3), (5, 4, 6),
	(6, 1, 1), (6, 2, 3), (6, 3, 2), (6, 4, 4),
	(7, 1, 3), (7, 2, 4), (7, 3, 5), (7, 4, 7),
	(8, 1, 5), (8, 2, 3), (8, 3, 6), (8, 4, 4),
	(9, 1, 1), (9, 2, 5), (9, 3, 3), (9, 4, 7),
	(10, 1, 2), (10, 2, 6), (10, 3, 8), (10, 4, 4)

--Insert fixed data into the [MODEL_PAYMENT] table
INSERT INTO dbo.MODE_PAYMENT (Mode)
VALUES
	('CASH'),
	('BANKING'),
	('CARD')