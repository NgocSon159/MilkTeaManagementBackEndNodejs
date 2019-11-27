import {Observable} from "rxjs";
import {Food} from '../../model/Food'
import {DiscountRepository} from "../../repository/DiscountRepository";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchResult} from "../../../common/model/SearchResult";
import {DiscountService} from "../DiscountService";
import {Discount} from "../../model/Discount";

export class DiscountServiceImpl implements DiscountService{
    constructor(private disountRepository: DiscountRepository) {

    }
    getAll(): Observable<Discount[]> {
        return this.disountRepository.getAll();
    }

}
