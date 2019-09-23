import {Order} from "../model/Order";

export class OrderBuilder {
    public static buildToOrder(obj: Order): Order {
        if (obj['createdOn']) {
            obj['createdOn'] = new Date(obj['createdOn']);
        }
        if (obj['servedOn']) {
            obj['servedOn'] = new Date(obj['servedOn']);
        }
        if (obj['completedOn']) {
            obj['completedOn'] = new Date(obj['completedOn']);
        }
        return obj;
    }
}