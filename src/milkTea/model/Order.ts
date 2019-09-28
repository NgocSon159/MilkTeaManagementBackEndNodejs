import {Food} from './Food'
import {FoodOfOrder} from "./FoodOfOrder";

export class Order {
    id?: string;
    orderId?: string;
    tableId?: string;
    createdOn?: Date;
    createdBy?: string;
    servedOn?: Date;
    servedBy?: string;
    completedOn?: Date;
    completedBy?: string;
    timeDone?: number;
    phoneNumber?: string;
    discount?: number;
    total?: number;
    cash?: number;
    change?: number;
    statusOrder?: string;
    status?: boolean;
    foods?: FoodOfOrder[];
}

export const orderCollectionName = "Orders";