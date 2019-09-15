import {FoodController} from "./controller/FoodController";
import {ApplicationContext} from "./config/ApplicationContext";

export class MilkTeaRoute {
    foodController: FoodController;

    constructor(mongo) {
        const applicationContext = new ApplicationContext(mongo);
        this.foodController = applicationContext.controllerFood;
    }

    routes(app) {
        // Food
        const parentPathNameFood = '/food';
        app.route(parentPathNameFood)
            .get(this.foodController.getAll.bind(this.foodController));
        app.route(parentPathNameFood + '/search')
            .post(this.foodController.search.bind(this.foodController));
    }

}