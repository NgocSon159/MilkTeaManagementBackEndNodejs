mongo MilkTea --eval "db.dropDatabase()"

mongoimport --host localhost --db MilkTea --collection Food --type json --file ./food_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Categories --type json --file ./categories_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Orders --type json --file ./orders_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Table --type json --file ./table_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Type --type json --file ./type_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Employee --type json --file ./employee_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Branch --type json --file ./branches_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection User --type json --file ./users_init.json --jsonArray --maintainInsertionOrder

mongoimport --host localhost --db MilkTea --collection Discount --type json --file ./discount.json --jsonArray --maintainInsertionOrder