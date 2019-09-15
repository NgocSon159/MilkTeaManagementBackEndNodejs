import {SearchModel} from "../../common/search-model/searchModel";

export class FoodSM extends SearchModel{
    foodID?:   string;
    name?:    string;
    price?:     number;
    size?:     string;
    categoryID?: string;
    status?:     boolean;
}