import {FoodService} from "../service/FoodService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";
import {TableService} from "../service/TableService";

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
}