import {FoodService} from "../service/FoodService";
import {FoodController} from "../controller/FoodController";
import {FoodRepositoryImpl} from "../repository/impl/FoodRepositoryImpl";
import {FoodServiceImpl} from "../service/impl/FoodServiceImpl";
import {OrderService} from "../service/OrderService";
import {OrderController} from "../controller/OrderController";
import {OrderRepositoryImpl} from "../repository/impl/OrderRepositoryImpl";
import {OrderServiceImpl} from "../service/impl/OrderServiceImpl";

export class ApplicationContext {
    readonly serviceFood: FoodService;
    readonly controllerFood: FoodController;
    readonly serviceOrder: OrderService;
    readonly controllerOrder: OrderController;

    constructor(mongo) {
        const repositoryFood = new FoodRepositoryImpl(mongo);
        const repositoryOrder = new OrderRepositoryImpl(mongo);

        this.serviceFood = new FoodServiceImpl(repositoryFood);
        this.controllerFood = new FoodController(this.serviceFood);
        this.serviceOrder = new OrderServiceImpl(repositoryOrder);
        this.controllerOrder = new OrderController(this.serviceOrder);
    }
}