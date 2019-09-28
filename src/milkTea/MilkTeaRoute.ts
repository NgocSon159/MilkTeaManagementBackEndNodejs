import {FoodController} from "./controller/FoodController";
import {ApplicationContext} from "./config/ApplicationContext";
import {OrderController} from "./controller/OrderController";
import {TableController} from "./controller/TableController";

export class MilkTeaRoute {
    foodController: FoodController;
    orderController: OrderController;
    tableController: TableController;

    constructor(mongo) {
        const applicationContext = new ApplicationContext(mongo);
        this.foodController = applicationContext.controllerFood;
        this.orderController = applicationContext.controllerOrder;
        this.tableController = applicationContext.controllerTable;
    }

    routes(app) {
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
        app.route(parentPathNameOrder + '/:id')
            .get(this.orderController.getByOrderId.bind(this.orderController));

        // For Barista
        app.route(parentPathNameOrder + '/user/barista')
            .get(this.orderController.getFoodOfOrderBarista.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/barista/process/:userName') // UserName is who make this ordeR
            .post(this.orderController.updateOrderToProcessing.bind(this.orderController)); // Post object Order.
        app.route(parentPathNameOrder + '/user/barista/processFood/:foodId') // foodId is food was finished
            .post(this.orderController.updateFoodFinished.bind(this.orderController)); // Post object Order.

        // For Waiter
        app.route(parentPathNameOrder) // Create new Order.
            .post(this.orderController.insert.bind(this.orderController));

        // For Cashier
        app.route(parentPathNameOrder + '/user/cashier')
            .get(this.orderController.getOrderOfCashier.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/cashier/payment/:orderId') // to make payment for order
            .put(this.orderController.updateToCompleted.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/cashier/cancel/:orderId') // to cancel order
            .get(this.orderController.cancelOrder.bind(this.orderController));

        // Table
        const parentPathNameTable = '/table';
        app.route(parentPathNameTable)
            .get(this.tableController.getAll.bind(this.tableController));
        app.route(parentPathNameTable + '/search')
            .post(this.tableController.search.bind(this.tableController));
    }
}