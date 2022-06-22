USE `vending_machine`;
--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` 
    VALUES 
    (15912,now(),132,'A basic no nonsense cola that is the perfect pick me up for any occasion.',null,200,'Cola',1,null),
    (15913,now(),12,'An effervescent fruity experience with hints of grape and coriander.',null,100,'Fizz',1,null),
    (15914,now(),68,'An explosion of flavor that will knock your socks off!',null,100,'Pop',1,null),
    (15915,now(),47,'Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.',null,50,'Mega Pop',1,null);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Promotions`
--

-- LOCK TABLES `Promotions` WRITE;
/*!40000 ALTER TABLE `Promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Promotions` ENABLE KEYS */;
-- UNLOCK TABLES;