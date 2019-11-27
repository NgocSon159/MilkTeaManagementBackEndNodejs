import {DiscountService} from "../service/DiscountService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";

export class DiscountController {
    constructor(private discountService: DiscountService) {

    }
    getAll(req: Request, res: Response) {
        return this.discountService.getAll().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
}
