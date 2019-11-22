
import {FoodService} from "../FoodService";
import {Observable} from "rxjs";
import {Food} from '../../model/Food'
import {FoodRepository} from "../../repository/FoodRepository";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchResult} from "../../../common/model/SearchResult";
import {TableService} from "../TableService";
import {Table} from "../../model/Table";
import {TableSM} from "../../search-Model/TableSM";
import {TableRepository} from "../../repository/TableRepository";

export class TableServiceImpl implements TableService{
    constructor(private tableRepository: TableRepository) {

    }
    getAll(): Observable<Table[]> {
        return this.tableRepository.getAll();
    }
    search(s: TableSM): Observable<SearchResult<Table>> {
        return this.tableRepository.search(s);
    }
    getTableFull(): Observable<Table[]> {
        return this.tableRepository.getTableFull();
    }
}
