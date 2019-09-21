import {Observable} from "rxjs";
import {OrderSM} from "../search-Model/OrderSM";
import {SearchResult} from "../../common/model/SearchResult";
import {Order} from "../model/Order";

export interface OrderService {
    getAll(): Observable<Order[]>;
    search(s: OrderSM): Observable<SearchResult<Order>>;
    getByOrderId(id: string): Observable<Order>;
    getOrderOfBarista(): Observable<Order[]>;
    getOrderOfCashier(): Observable<Order[]>;
    updateToServered(orderId: string, userName: string): Observable<boolean>;
    updateToCompleted(object: Order, orderId: string): Observable<Order>;
}