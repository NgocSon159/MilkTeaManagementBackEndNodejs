import {Observable} from "rxjs";
import {SearchResult} from "../../common/model/SearchResult";
import {Table} from "../model/Table";
import {TableSM} from "../search-Model/TableSM";

export interface TableService {
    getAll(): Observable<Table[]>;
    search(s: TableSM): Observable<SearchResult<Table>>;
}