import {Observable} from "rxjs";
import {Food} from "../model/Food";

export interface FoodRepository {
    getAll(): Observable<Food[]>
}