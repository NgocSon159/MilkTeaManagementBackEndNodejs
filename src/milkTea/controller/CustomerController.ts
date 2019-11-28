import {DiscountService} from "../service/DiscountService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";
import {CustomerService} from "../service/CustomerService";

export class CustomerController {
    constructor(private customerService: CustomerService) {

    }
    getById(req: Request, res: Response) {
        const id = req.params.id;
        return this.customerService.getById(id).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
}
