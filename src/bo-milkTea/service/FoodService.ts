import {Observable} from "rxjs";

export interface FoodService {
    getAll(): Observable<any>;
}