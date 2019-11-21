import {FoodService} from "../service/FoodService";
import {FoodController} from "../controller/FoodController";
import {FoodRepositoryImpl} from "../repository/impl/FoodRepositoryImpl";
import {FoodServiceImpl} from "../service/impl/FoodServiceImpl";
import {OrderService} from "../service/OrderService";
import {OrderController} from "../controller/OrderController";
import {OrderRepositoryImpl} from "../repository/impl/OrderRepositoryImpl";
import {OrderServiceImpl} from "../service/impl/OrderServiceImpl";
import {TableService} from "../service/TableService";
import {TableController} from "../controller/TableController";
import {TableRepositoryImpl} from "../repository/impl/TableRepositoryImpl";
import {TableServiceImpl} from "../service/impl/TableServiceImpl";
import {UserService} from "../service/UserService";
import {UserController} from "../controller/UserController";
import {UserRepositoryImpl} from "../repository/impl/UserRepositoryImpl";
import {UserServiceImpl} from "../service/impl/UserServiceImpl";

export class ApplicationContext {
    readonly serviceFood: FoodService;
    readonly controllerFood: FoodController;
    readonly serviceOrder: OrderService;
    readonly controllerOrder: OrderController;
    readonly serviceTable: TableService;
    readonly controllerTable: TableController;
    readonly serviceUser: UserService;
    readonly controllerUser: UserController;

    constructor(mongo) {
        const repositoryFood = new FoodRepositoryImpl(mongo);
        const repositoryOrder = new OrderRepositoryImpl(mongo);
        const repositoryTable = new TableRepositoryImpl(mongo);
        const repositoryUser = new UserRepositoryImpl(mongo);

        this.serviceFood = new FoodServiceImpl(repositoryFood);
        this.controllerFood = new FoodController(this.serviceFood);
        this.serviceOrder = new OrderServiceImpl(repositoryOrder);
        this.controllerOrder = new OrderController(this.serviceOrder);
        this.serviceTable = new TableServiceImpl(repositoryTable);
        this.controllerTable = new TableController(this.serviceTable);
        this.serviceUser = new UserServiceImpl(repositoryUser);
        this.controllerUser = new UserController(this.serviceUser);
    }
}
