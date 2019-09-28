mongo MilkTea --eval "db.dropDatabase()"

mongoimport --host localhost --db MilkTea --collection Food --type json --file ./food_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Categories --type json --file ./categories_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Orders --type json --file ./orders_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Table --type json --file ./table_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Type --type json --file ./type_init.json --jsonArray --maintainInsertionOrder