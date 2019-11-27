import {FoodService} from "../service/FoodService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";
import {TableService} from "../service/TableService";
import {Observable} from "rxjs";
import {Table} from "../model/Table";

export class TableController {
    constructor(private tableService: TableService) {

    }
    getAll(req: Request, res: Response) {
        return this.tableService.getAll().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    search(req: Request, res: Response) {
        const s = SearchModelBuilder.buildSearchModel(req.body);
        return this.tableService.search(s).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    getTableFull(req: Request, res: Response) {
        return this.tableService.getTableFull().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    updateTablePayment(req: Request, res: Response) {
        const tableId = req.params.tableId;
        return this.tableService.updateTablePayment(Number(tableId)).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
}
