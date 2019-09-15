import {FoodService} from "../service/FoodService";
import {FoodController} from "../controller/FoodController";
import {FoodRepositoryImpl} from "../repository/impl/FoodRepositoryImpl";
import {FoodServiceImpl} from "../service/impl/FoodServiceImpl";

export class ApplicationContext {
    readonly serviceFood: FoodService;
    readonly controllerFood: FoodController;
    constructor(mongo) {
        const repositoryFood = new FoodRepositoryImpl(mongo);
        this.serviceFood = new FoodServiceImpl(repositoryFood);
        this.controllerFood = new FoodController(this.serviceFood);
    }
}