import {Observable} from "rxjs";
import {OrderSM} from "../search-Model/OrderSM";
import {SearchResult} from "../../common/model/SearchResult";
import {Order} from "../model/Order";

export interface OrderService {
    getAll(): Observable<Order[]>;
    search(s: OrderSM): Observable<SearchResult<Order>>;
    getByOrderId(id: string): Observable<Order>;
    getFoodOfOrderBarista(): Observable<Order[]>;
    getOrderOfCashier(): Observable<Order[]>;
    insert(obj: Order): Observable<Order>;
    updateOrderProcessing(order: Order, userName: string): Observable<Order>;
    updateFoodFinished(order: Order, foodId: string): Observable<Order>;
    updateOrderServed(order: Order): Observable<Order>;
    updateOrderCompleted(object: Order, userName: string): Observable<Order>;
    cancelOrder(order: Order): Observable<Order>;
    reOrder(order: Order): Observable<Order>;
}
