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
import {CustomerRepository} from "../CustomerRepository";
import {Customer, customerCollectionName} from "../../model/Customer";

export class CustomerRepositoryImpl implements CustomerRepository {
    constructor(private db: Db) {

    }

    getById(id: string): Observable<Customer> {
        const query = {
            phoneNumber: id
        };
        return MongoUtil.rxFindOne(this.db.collection(customerCollectionName), query);
    }

}
