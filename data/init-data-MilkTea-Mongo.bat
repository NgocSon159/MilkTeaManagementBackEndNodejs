mongoimport --host localhost --db MilkTea --collection Food --type json --file ./food_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Categories --type json --file ./categories_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Orders --type json --file ./orders_init.json --jsonArray --maintainInsertionOrder