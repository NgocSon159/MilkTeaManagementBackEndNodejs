import {Observable} from "rxjs";
import {SearchResult} from "../../common/model/SearchResult";
import {Table} from "../model/Table";
import {TableSM} from "../search-Model/TableSM";
import {Order} from "../model/Order";

export interface TableService {
    getAll(): Observable<Table[]>;
    search(s: TableSM): Observable<SearchResult<Table>>;
    getTablePayment(): Observable<Table[]>;
    updateTablePayment(tableId: number): Observable<Table>;
    getOrderFromTable(tableId: number): Observable<Order>;
}
