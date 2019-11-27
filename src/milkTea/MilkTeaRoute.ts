import {FoodController} from "./controller/FoodController";
import {ApplicationContext} from "./config/ApplicationContext";
import {OrderController} from "./controller/OrderController";
import {TableController} from "./controller/TableController";
import {UserController} from "./controller/UserController";
import {DiscountController} from "./controller/DiscountController";

export class MilkTeaRoute {
    foodController: FoodController;
    orderController: OrderController;
    tableController: TableController;
    userController: UserController;
    discountController: DiscountController;

    constructor(mongo) {
        const applicationContext = new ApplicationContext(mongo);
        this.foodController = applicationContext.controllerFood;
        this.orderController = applicationContext.controllerOrder;
        this.tableController = applicationContext.controllerTable;
        this.userController = applicationContext.controllerUser;
        this.discountController = applicationContext.controllerDiscount;
    }

    routes(app) {
        // Login
        const parentPathNameLogin = '/login';
        app.route(parentPathNameLogin)
            .post(this.userController.login.bind(this.userController)); // userName, password (ko ma hoa) or header have "token": "asdaqwxqdasxd"

        // Food
        const parentPathNameFood = '/food';
        app.route(parentPathNameFood)
            .get(this.foodController.getAll.bind(this.foodController));
        app.route(parentPathNameFood + '/search')
            .post(this.foodController.search.bind(this.foodController));

        // Order
        const parentPathNameOrder = '/order';
        app.route(parentPathNameOrder)
            .get(this.orderController.getAll.bind(this.orderController));
        app.route(parentPathNameOrder + '/search')
            .post(this.orderController.search.bind(this.orderController));
        app.route(parentPathNameOrder + '/:id/:name')
            .get(this.orderController.getByOrderId.bind(this.orderController));

        // For Barista
        app.route(parentPathNameOrder + '/user/barista')
            .get(this.orderController.getFoodOfOrderBarista.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/barista/process/:userName') // UserName is who make this ordeR
            .put(this.orderController.updateOrderToProcessing.bind(this.orderController)); // Put object Order.
        app.route(parentPathNameOrder + '/user/barista/processFood/:foodId') // foodId is food was finished
            .put(this.orderController.updateFoodFinished.bind(this.orderController)); // Put object Order.
        app.route(parentPathNameOrder + '/user/barista/serveOrder') // server 1 order.
            .put(this.orderController.updateOrderServed.bind(this.orderController)); // Put object Order.

        // For Waiter
        app.route(parentPathNameOrder) // Create new Order.
            .post(this.orderController.insert.bind(this.orderController));
        app.route(parentPathNameOrder + '/cancelOrder') // to cancel order
            .put(this.orderController.cancelOrder.bind(this.orderController));

        // For Cashier
        app.route(parentPathNameOrder + '/user/cashier')
            .get(this.orderController.getOrderOfCashier.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/cashier/payment/:userName') // to make payment for order
            .put(this.orderController.updateOrderCompleted.bind(this.orderController));

        // Table
        const parentPathNameTable = '/table';
        app.route(parentPathNameTable)
            .get(this.tableController.getAll.bind(this.tableController));
        app.route(parentPathNameTable + '/search')
            .post(this.tableController.search.bind(this.tableController));
        app.route(parentPathNameTable + "/full")
            .get(this.tableController.getTableFull.bind(this.tableController));
        app.route(parentPathNameTable + "/updatePayment/:tableId")
            .get(this.tableController.updateTablePayment.bind(this.tableController));

        const parentPathNameDiscount = '/discount';
        app.route(parentPathNameDiscount)
            .get(this.discountController.getAll.bind(this.discountController));
    }
}
