import {FoodService} from "../service/FoodService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";

export class FoodController {
    constructor(private foodService: FoodService) {

    }
    getAll(req: Request, res: Response) {
        return this.foodService.getAll().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
    search(req: Request, res: Response) {
        const s = SearchModelBuilder.buildSearchModel(req.body);
        return this.foodService.search(s).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
}