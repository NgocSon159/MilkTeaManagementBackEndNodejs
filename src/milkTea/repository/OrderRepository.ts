import {Observable} from "rxjs";
import {SearchResult} from "../../common/model/SearchResult";
import {Order} from "../model/Order";
import {OrderSM} from "../search-Model/OrderSM";

export interface OrderRepository {
    getAll(): Observable<Order[]>
    search(s: OrderSM): Observable<SearchResult<Order>>;
    getByOrderId(id: string): Observable<Order>;
    getFoodOfOrderBarista(): Observable<Order[]>;
    getOrderOfCashier(): Observable<Order[]>;
    insert(obj: Order): Observable<Order>;
    updateOrderToProcessing(order: Order, userName: string): Observable<Order>;
    updateFoodFinished(order: Order, foodId: string): Observable<Order>;
    updateToCompleted(object: Order, orderId: string): Observable<Order>;
    cancelOrder(orderId: string): Observable<boolean>;
}