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

    updateOrderProcessing(order: Order, userName: string): Observable<Order> {
        return this.orderRepository.updateOrderProcessing(order, userName);
    }

    updateFoodFinished(order: Order, foodId: string): Observable<Order> {
        return this.orderRepository.updateFoodFinished(order, foodId);
    }

    updateOrderServed(order: Order): Observable<Order> {
        return this.orderRepository.updateOrderServed(order);
    }

    updateOrderCompleted(object: Order, userName: string): Observable<Order> {
        return this.orderRepository.updateOrderCompleted(object, userName);
    }

    cancelOrder(order: Order): Observable<Order> {
        return this.orderRepository.cancelOrder(order);
    }

    reOrder(order: Order): Observable<Order> {
        return this.orderRepository.reOrder(order);
    }
}
