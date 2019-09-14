import {FoodService} from "../FoodService";
import {Observable} from "rxjs";
import {Food} from '../../model/Food'
import {FoodRepository} from "../../repository/FoodRepository";

export class FoodServiceImpl implements FoodService{
    constructor(private foodRepository: FoodRepository) {

    }
    getAll(): Observable<Food[]> {
        return this.foodRepository.getAll();
    }
}