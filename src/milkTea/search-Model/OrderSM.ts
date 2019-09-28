import {SearchModel} from "../../common/search-model/searchModel";

export class OrderSM  extends SearchModel{
    id?:         string;
    orderId?:     string;
    createdOn?:   Date;
    createdBy?:   string;
    phoneNumber?: string;
    statusOrder?: string;
}