import {Observable} from "rxjs";
import {Food} from "../model/Food";
import {FoodSM} from "../search-Model/FoodSM";
import {SearchResult} from "../../common/model/SearchResult";

export interface FoodService {
    getAll(): Observable<Food[]>;
    search(s: FoodSM): Observable<SearchResult<Food>>;
}