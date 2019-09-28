import {Observable} from "rxjs";
import {SearchResult} from "../../../common/model/SearchResult";
import {OrderService} from "../OrderService";
import {Order} from "../../model/Order";
import {OrderSM} from "../../search-Model/OrderSM";
import {OrderRepository} from "../../repository/OrderRepository";

export class OrderServiceImpl implements OrderService{
    constructor(private orderRepository: OrderRepository) {

    }

    getAll(): Observable<Order[]> {
        return this.orderRepository.getAll();
    }

    search(s: OrderSM): Observable<SearchResult<Order>> {
        return this.orderRepository.search(s);
    }

    getByOrderId(id: string): Observable<Order> {
        return this.orderRepository.getByOrderId(id);
    }

    getFoodOfOrderBarista(): Observable<Order[]> {
        return this.orderRepository.getFoodOfOrderBarista();
    }

    getOrderOfCashier(): Observable<Order[]> {
        return this.orderRepository.getOrderOfCashier();
    }

    insert(obj: Order): Observable<Order> {
        return this.orderRepository.insert(obj);
    }

    updateOrderToProcessing(order: Order, userName: string): Observable<Order> {
        return this.orderRepository.updateOrderToProcessing(order, userName);
    }

    updateFoodFinished(order: Order, foodId: string): Observable<Order> {
        return this.orderRepository.updateFoodFinished(order, foodId);
    }

    updateToCompleted(object: Order, orderId: string): Observable<Order> {
        return this.orderRepository.updateToCompleted(object, orderId);
    }

    cancelOrder(orderId: string): Observable<boolean> {
        return this.orderRepository.cancelOrder(orderId);
    }
}