import {Observable, of} from "rxjs";
import {MongoUtil} from "../../../common/util/MongoUtil";
import {Db, MongoError} from "mongodb";
import {SearchResult} from "../../../common/model/SearchResult";
import {SearchModelBuilder} from "../../../common/util/SearchModelBuilder";
import {flatMap} from "rxjs/operators";
import {OrderRepository} from "../OrderRepository";
import {Order, orderCollectionName} from "../../model/Order";
import {OrderSM} from "../../search-Model/OrderSM";
import {OrderStatusEnum} from "../../enum/OrderStatusEnum";
import {DateUtil} from "../../../common/util/DateUtil";

export class OrderRepositoryImpl implements OrderRepository {
    constructor(private db: Db) {

    }

    getAll(): Observable<Order[]> {
        return MongoUtil.rxFind(this.db.collection(orderCollectionName), {})
    }

    search(s: OrderSM): Observable<SearchResult<Order>> {
        const query = SearchModelBuilder.buildQuery(s);
        const sort = SearchModelBuilder.buildSort(s);
        // @ts-ignore
        return MongoUtil.rxFind(this.db.collection(orderCollectionName), query, sort, s.pageSize, s.pageSize * (s.pageIndex -1)).pipe(flatMap((result1) => {
            const searchResult: SearchResult<Order> = {};
            searchResult.pageIndex = s.pageIndex;
            searchResult.pageSize = s.pageSize;
            searchResult.result = result1;
            return of(searchResult)
        }));
    }
    getByOrderId(id: string): Observable<Order> {
        const query = {
            orderID: id
        };
        return MongoUtil.rxFindOne(this.db.collection(orderCollectionName), query);
    }

    getOrderOfBarista(): Observable<Order[]> {
        const query = {
            $or: [
                {
                    statusOrder: OrderStatusEnum.Ordered
                },
                {
                    statusOrder: OrderStatusEnum.Processing
                }
            ]

        };
        return MongoUtil.rxFind(this.db.collection(orderCollectionName), query);
    }

    getOrderOfCashier(): Observable<Order[]> {
        const query = {
            $or: [
                {
                    statusOrder: OrderStatusEnum.Served
                },
                {
                    statusOrder: OrderStatusEnum.Completed
                }
            ]

        };
        return MongoUtil.rxFind(this.db.collection(orderCollectionName), query);
    }

    updateToServered(orderId: string, userName: string): Observable<boolean> {
        const query = {
            orderID: orderId
        };
        return MongoUtil.rxFindOne<Order>(this.db.collection(orderCollectionName), query).pipe(flatMap((obj) => {
            if (obj && obj.statusOrder !== OrderStatusEnum.Ordered) {
                return of(false);
            } else {
                const objUpdate: Order = {
                    servedOn: DateUtil.createDateAsUTC(DateUtil.now()),
                    servedBy: userName,
                    timeDone: DateUtil.calculateSecond2Date(DateUtil.createDateAsUTC(DateUtil.now()), obj.createdOn),
                    statusOrder: OrderStatusEnum.Served
                };
                return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), query, objUpdate).pipe(flatMap((obj1) => {
                    if (obj1 instanceof MongoError || obj1 === null) {
                        return of(false);
                    } else {
                        return of(true);
                    }
                }));
            }
        }));
    }

    updateToCompleted(object: Order, orderId: string): Observable<Order> {
        const query = {
            orderID: orderId
        };
        object.statusOrder = OrderStatusEnum.Completed;
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), query, object);
    }

    cancelOrder(orderId: string): Observable<boolean> {
        const query = {
            orderID: orderId
        };
        const obj: Order = {
            statusOrder: OrderStatusEnum.Canceled
        };
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), query, obj).pipe(flatMap((obj) => {
            if (obj instanceof MongoError || obj === null) {
                return of(false);
            } else {
                return of(true);
            }
        }));
    }
}