USE `vending_machine`;
--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (15912,132,'A basic no nonsense cola that is the perfect pick me up for any occasion.',200,'Cola',1),(15913,12,'An effervescent fruity experience with hints of grape and coriander.',100,'Fizz',1),(15914,68,'An explosion of flavor that will knock your socks off!',100,'Pop',1),(15915,47,'Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.',50,'Mega Pop',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;