import {FoodService} from "../FoodService";
import {Observable} from "rxjs";
import {Food} from '../../model/Food'
import {FoodRepository} from "../../repository/FoodRepository";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchResult} from "../../../common/model/SearchResult";

export class FoodServiceImpl implements FoodService{
    constructor(private foodRepository: FoodRepository) {

    }
    getAll(): Observable<Food[]> {
        return this.foodRepository.getAll();
    }
    search(s: FoodSM): Observable<SearchResult<Food>> {
        return this.foodRepository.search(s);
    }
}