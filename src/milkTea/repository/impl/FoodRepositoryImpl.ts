import {FoodRepository} from "../FoodRepository";
import {Food, foodCollectionName} from "../../model/Food";
import {Observable, of} from "rxjs";
import {MongoUtil} from "../../../common/util/MongoUtil";
import {Db} from "mongodb";
import {SearchResult} from "../../../common/model/SearchResult";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchModelBuilder} from "../../../common/util/SearchModelBuilder";
import {flatMap} from "rxjs/operators";

export class FoodRepositoryImpl implements FoodRepository {
    constructor(private db: Db) {

    }

    getAll(): Observable<Food[]> {
        return MongoUtil.rxFind(this.db.collection(foodCollectionName), {})
    }

    search(s: FoodSM): Observable<SearchResult<Food>> {
        const query = SearchModelBuilder.buildQuery(s);
        const sort = SearchModelBuilder.buildSort(s);
        // @ts-ignore
        return MongoUtil.rxFind(this.db.collection(foodCollectionName), query, sort, s.pageSize, s.pageSize * (s.pageIndex -1)).pipe(flatMap((result1) => {
            const searchResult: SearchResult<Food> = {};
            searchResult.pageIndex = s.pageIndex;
            searchResult.pageSize = s.pageSize;
            searchResult.result = result1;
            return of(searchResult)
        }));
    }
}