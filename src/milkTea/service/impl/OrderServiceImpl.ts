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

    getOrderOfBarista(): Observable<Order[]> {
        return this.orderRepository.getOrderOfBarista();
    }

    getOrderOfCashier(): Observable<Order[]> {
        return this.orderRepository.getOrderOfCashier();
    }

    updateToServered(orderId: string, userName: string): Observable<boolean> {
        return this.orderRepository.updateToServered(orderId, userName);
    }

    updateToCompleted(object: Order, orderId: string): Observable<Order> {
        return this.orderRepository.updateToCompleted(object, orderId);
    }
}