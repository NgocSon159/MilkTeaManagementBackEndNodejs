import {FoodRepository} from "../FoodRepository";
import {Discount, discountCollectionName} from "../../model/Discount";
import {Observable, of} from "rxjs";
import {MongoUtil} from "../../../common/util/MongoUtil";
import {Db} from "mongodb";
import {SearchResult} from "../../../common/model/SearchResult";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchModelBuilder} from "../../../common/util/SearchModelBuilder";
import {flatMap} from "rxjs/operators";
import {DiscountRepository} from "../DiscountRepository";
import {DateUtil} from "../../../common/util/DateUtil";

export class DiscountRepositoryImpl implements DiscountRepository {
    constructor(private db: Db) {

    }

    getAll(): Observable<Discount[]> {
        const date = DateUtil.createDateAsUTC(new Date());
        // console.log("date now", date);
        const query = {
            startDate : {
                $lte: date
            },
            endDate: {
                $gte: date
            }

        };
        return MongoUtil.rxFind(this.db.collection(discountCollectionName), query);
    }

}
