import {FoodService} from "../service/FoodService";
import {Request, Response} from 'express';
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {SearchModelBuilder} from "../../common/util/SearchModelBuilder";
import {OrderService} from "../service/OrderService";
import {Observable} from "rxjs";
import {Order} from "../model/Order";
import {OrderBuilder} from "../builder/OrderBuilder";
import {OrderStatusEnum} from "../enum/OrderStatusEnum";

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

    getFoodOfOrderBarista(req: Request, res: Response) {
        return this.orderService.getFoodOfOrderBarista().subscribe(result => {
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

    insert(req: Request, res: Response) {
        const order = OrderBuilder.buildToOrder(req.body);
        order.statusOrder = OrderStatusEnum.Ordered;
        return this.orderService.insert(order).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    updateOrderToProcessing(req: Request, res: Response) {
        const order = OrderBuilder.buildToOrder(req.body);
        const userName = req.params.userName;
        return this.orderService.updateOrderToProcessing(order, userName).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    updateFoodFinished(req: Request, res: Response) {
        const order = OrderBuilder.buildToOrder(req.body);
        const userName = req.params.userName;
        const foodId = req.params.foodId;
        return this.orderService.updateFoodFinished(order, foodId).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    updateToCompleted(req: Request, res: Response) {
        const orderId = req.params.orderId;
        const order = OrderBuilder.buildToOrder(req.body);
        return this.orderService.updateToCompleted(order, orderId).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }

    cancelOrder(req: Request, res: Response) {
        const orderId = req.params.orderId;
        return this.orderService.cancelOrder(orderId).subscribe(result => {
            return ResponseUtil.responseSuccess(res, result);
        }, error => {
            return ResponseUtil.responseError(res, error);
        });
    }
}