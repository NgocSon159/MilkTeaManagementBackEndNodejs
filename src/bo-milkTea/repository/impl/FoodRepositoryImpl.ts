import {FoodRepository} from "../FoodRepository";
import {Food, foodCollectionName} from "../../model/Food";
import {Observable} from "rxjs";
import {MongoUtil} from "../../../common/util/MongoUtil";
import {Db} from "mongodb";

export class FoodRepositoryImpl implements FoodRepository{
    constructor(private db: Db) {

    }
    getAll(): Observable<Food[]> {
        return MongoUtil.rxFind(this.db.collection(foodCollectionName), {})
    }
}