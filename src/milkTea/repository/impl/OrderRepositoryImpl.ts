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
import {Table, tableCollectionName} from "../../model/Table";
import {TableEnum} from "../../enum/TableEnum";
import {FoodStatusEnum} from "../../enum/FoodStatusEnum";

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
        return MongoUtil.rxFind(this.db.collection(orderCollectionName), query, sort, s.pageSize, s.pageSize * (s.pageIndex - 1)).pipe(flatMap((result1) => {
            const searchResult: SearchResult<Order> = {};
            searchResult.pageIndex = s.pageIndex;
            searchResult.pageSize = s.pageSize;
            searchResult.result = result1;
            return of(searchResult)
        }));
    }

    getByOrderId(id: string): Observable<Order> {
        const query = {
            orderId: id
        };
        return MongoUtil.rxFindOne(this.db.collection(orderCollectionName), query);
    }

    getFoodOfOrderBarista(): Observable<Order[]> {
        const query = {
            $or: [
                {
                    statusOrder: OrderStatusEnum.Ordered
                },
                {
                    statusOrder: OrderStatusEnum.ReOrdered
                },
                {
                    statusOrder: OrderStatusEnum.Processing
                }
            ]

        };
        return MongoUtil.rxFind<Order>(this.db.collection(orderCollectionName), query).pipe(flatMap((obj) => {
            let listOrder = obj;
            listOrder.map(item => {
                let listFood = item.foods;
                listFood = listFood.filter(item1 => {
                    if (item1.statusFood === FoodStatusEnum.Ordered) {
                        return true;
                    } else return false;
                });
                item.foods = listFood;
            });
            return of(listOrder);
        }));
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

    insert(obj: Order): Observable<Order> {
        const foodArr = obj.foods;
        if (foodArr.length > 0) {
            foodArr.map(item => {
                item.statusFood = FoodStatusEnum.Ordered;
            })
        }
        obj.foods = foodArr;
        return MongoUtil.rxInsert(this.db.collection(orderCollectionName), obj).pipe(flatMap((obj1) => {
            const updateTable: Table = {
                orderId: obj.orderId,
                statusTable: TableEnum.Full
            };
            return MongoUtil.rxUpdate(this.db.collection(tableCollectionName), {tableId: obj.tableId}, updateTable).pipe(flatMap((result1) => {
                return of(obj1);
            }));

        }));
    }

    updateOrderProcessing(order: Order, userName: string): Observable<Order> {
        order.statusOrder = OrderStatusEnum.Processing;
        order.servedBy = userName;
        order.foods.map(item => {
            item.statusFood = FoodStatusEnum.Processing
        });
        // const objUpdate: Order = {
        //     servedOn: DateUtil.createDateAsUTC(DateUtil.now()),
        //     servedBy: userName,
        //     timeDone: DateUtil.calculateSecond2Date(DateUtil.createDateAsUTC(DateUtil.now()), obj.createdOn),
        //     statusOrder: OrderStatusEnum.Served
        // };
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), {orderId: order.orderId}, order);
    }

    updateFoodFinished(order: Order, foodId: string): Observable<Order> {
        order.foods.map(item => {
            if (item.foodId === foodId) {
                item.statusFood = FoodStatusEnum.Finished;
            }
        });
        if (this.checkFinishAllFood(order) === false) {
            order.statusOrder = OrderStatusEnum.Served;
            order.servedOn = DateUtil.createDateAsUTC(DateUtil.now());
            order.timeDone = DateUtil.calculateSecond2Date(order.servedOn, order.createdOn);
        }
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), {orderId: order.orderId}, order);
    }

    checkFinishAllFood(order: Order): boolean {
        let existFoodProcessing = false;
        order.foods.map(item => {
            if (item.statusFood === FoodStatusEnum.Processing || item.statusFood === FoodStatusEnum.Ordered) {
                existFoodProcessing = true;
            }
        });
        return existFoodProcessing;
    }

    updateOrderServed(order: Order): Observable<Order> {
        order.foods.map(item => {
            item.statusFood = FoodStatusEnum.Finished
        });
        order.statusOrder = OrderStatusEnum.Served;
        order.servedOn = DateUtil.createDateAsUTC(DateUtil.now());
        order.timeDone = DateUtil.calculateSecond2Date(order.servedOn, order.createdOn);
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), {orderId: order.orderId}, order);
    }

    updateOrderCompleted(object: Order, userName: string): Observable<Order> {
        const query = {
            orderId: object.orderId
        };
        object.statusOrder = OrderStatusEnum.Completed;
        object.completedBy = userName;
        object.completedOn = DateUtil.createDateAsUTC(DateUtil.now());
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), query, object).pipe(flatMap((obj) => {
            const updateTable = {
                orderId: "",
                statusTable: TableEnum.Empty
            };
            return MongoUtil.rxUpdate(this.db.collection(tableCollectionName), {tableId: object.tableId}, updateTable).pipe(flatMap((result) => {
                return of(obj);
            }))
        }));
    }

    cancelOrder(order: Order): Observable<any> {
        const query = {
            orderId: order.orderId
        };
        order.statusOrder = OrderStatusEnum.Canceled;
        return MongoUtil.rxUpdate(this.db.collection(orderCollectionName), query, order).pipe(flatMap((obj) => {
            const updateTable = {
                orderId: "",
                statusTable: TableEnum.Empty
            };
            return MongoUtil.rxUpdate(this.db.collection(tableCollectionName), {tableId: order.tableId}, updateTable).pipe(flatMap((result) => {
                return of(obj);
            }))
        }));
    }
}