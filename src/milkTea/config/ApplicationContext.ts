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
import {DiscountService} from "../service/DiscountService";
import {DiscountController} from "../controller/DiscountController";
import {DiscountRepositoryImpl} from "../repository/impl/DiscountRepositoryImpl";
import {DiscountServiceImpl} from "../service/impl/DiscountServiceImpl";
import {CustomerService} from "../service/CustomerService";
import {CustomerController} from "../controller/CustomerController";
import {CustomerRepositoryImpl} from "../repository/impl/CustomerRepositoryImpl";
import {CustomerServiceImpl} from "../service/impl/CustomerServiceImpl";

export class ApplicationContext {
    readonly serviceFood: FoodService;
    readonly controllerFood: FoodController;
    readonly serviceOrder: OrderService;
    readonly controllerOrder: OrderController;
    readonly serviceTable: TableService;
    readonly controllerTable: TableController;
    readonly serviceUser: UserService;
    readonly controllerUser: UserController;
    readonly serviceDiscount: DiscountService;
    readonly controllerDiscount: DiscountController;
    readonly serviceCustomer: CustomerService;
    readonly controllerCustomer: CustomerController;

    constructor(mongo) {
        const repositoryFood = new FoodRepositoryImpl(mongo);
        const repositoryOrder = new OrderRepositoryImpl(mongo);
        const repositoryTable = new TableRepositoryImpl(mongo);
        const repositoryUser = new UserRepositoryImpl(mongo);
        const repositoryDiscount = new DiscountRepositoryImpl(mongo);
        const repositoryCustomer = new CustomerRepositoryImpl(mongo);

        this.serviceFood = new FoodServiceImpl(repositoryFood);
        this.controllerFood = new FoodController(this.serviceFood);
        this.serviceOrder = new OrderServiceImpl(repositoryOrder);
        this.controllerOrder = new OrderController(this.serviceOrder);
        this.serviceTable = new TableServiceImpl(repositoryTable);
        this.controllerTable = new TableController(this.serviceTable);
        this.serviceUser = new UserServiceImpl(repositoryUser);
        this.controllerUser = new UserController(this.serviceUser);
        this.serviceDiscount = new DiscountServiceImpl(repositoryDiscount);
        this.controllerDiscount = new DiscountController(this.serviceDiscount);
        this.serviceCustomer = new CustomerServiceImpl(repositoryCustomer);
        this.controllerCustomer = new CustomerController(this.serviceCustomer);
    }
}
