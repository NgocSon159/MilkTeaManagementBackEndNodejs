import {SearchModel} from "../../common/search-model/searchModel";

export class FoodSM extends SearchModel{
    id?: string;
    foodId?:   string;
    name?:    string;
    price?:     number;
    size?:     string;
    categoryId?: string;
    status?:     boolean;
}