import {FoodService} from "../service/FoodService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";
import {OrderService} from "../service/OrderService";
import {Observable} from "rxjs";
import {Order} from "../model/Order";

export class OrderController {
    constructor(private orderService: OrderService) {
    }

    getAll(req: Request, res: Response) {
        return this.orderService.getAll().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    search(req: Request, res: Response) {
        const s = SearchModelBuilder.buildSearchModel(req.body);
        return this.orderService.search(s).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    getByOrderId(req: Request, res: Response) {
        const id = req.params.id;
        return this.orderService.getByOrderId(id).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    getOrderOfBarista(req: Request, res: Response) {
        return this.orderService.getOrderOfBarista().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    getOrderOfCashier(req: Request, res: Response) {
        return this.orderService.getOrderOfCashier().subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    updateToServered(req: Request, res: Response) {
        const orderId = req.params.orderId;
        const userName = req.params.userName;
        return this.orderService.updateToServered(orderId, userName).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    updateToCompleted(req: Request, res: Response) {
        const orderId = req.params.orderId;
        const order: Order = req.body;
        return this.orderService.updateToCompleted(order, orderId).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
}