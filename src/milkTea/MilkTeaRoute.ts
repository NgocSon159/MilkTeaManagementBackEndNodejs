import {FoodController} from "./controller/FoodController";
import {ApplicationContext} from "./config/ApplicationContext";
import {OrderController} from "./controller/OrderController";

export class MilkTeaRoute {
    foodController: FoodController;
    orderController: OrderController;

    constructor(mongo) {
        const applicationContext = new ApplicationContext(mongo);
        this.foodController = applicationContext.controllerFood;
        this.orderController = applicationContext.controllerOrder;
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
        app.route(parentPathNameOrder + '/user/barista')
            .get(this.orderController.getOrderOfBarista.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/barista/:orderId/:userName') // UserName is who make this order // Return True - False
            .get(this.orderController.updateToServered.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/cashier')
            .get(this.orderController.getOrderOfCashier.bind(this.orderController));
        app.route(parentPathNameOrder + '/user/cashier/payment/:orderId')
            .put(this.orderController.updateToCompleted.bind(this.orderController));
    }
}