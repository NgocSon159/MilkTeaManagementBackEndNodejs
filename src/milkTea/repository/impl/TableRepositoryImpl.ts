import {FoodRepository} from "../FoodRepository";
import {Food, foodCollectionName} from "../../model/Food";
import {Observable, of} from "rxjs";
import {MongoUtil} from "../../../common/util/MongoUtil";
import {Db} from "mongodb";
import {SearchResult} from "../../../common/model/SearchResult";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchModelBuilder} from "../../../common/util/SearchModelBuilder";
import {flatMap} from "rxjs/operators";
import {TableRepository} from "../TableRepository";
import {tableCollectionName, Table} from "../../model/Table";
import {TableSM} from "../../search-Model/TableSM";

export class TableRepositoryImpl implements TableRepository {
    constructor(private db: Db) {

    }

    getAll(): Observable<Table[]> {
        return MongoUtil.rxFind(this.db.collection(tableCollectionName), {})
    }

    search(s: TableSM): Observable<SearchResult<Table>> {
        const query = SearchModelBuilder.buildQuery(s);
        const sort = SearchModelBuilder.buildSort(s);
        // @ts-ignore
        return MongoUtil.rxFind(this.db.collection(tableCollectionName), query, sort, s.pageSize, s.pageSize * (s.pageIndex -1)).pipe(flatMap((result1) => {
            const searchResult: SearchResult<Food> = {};
            searchResult.pageIndex = s.pageIndex;
            searchResult.pageSize = s.pageSize;
            searchResult.result = result1;
            return of(searchResult)
        }));
    }

    getTableFull(): Observable<Table[]> {
        const query = {
            statusTable: "Full"
        };
        return MongoUtil.rxFind(this.db.collection(tableCollectionName), query);
    }
}
