import {Observable} from "rxjs";
import {Discount} from "../model/Discount";
import {FoodSM} from "../search-Model/FoodSM";
import {SearchResult} from "../../common/model/SearchResult";

export interface DiscountService {
    getAll(): Observable<Discount[]>;
}
