import {SearchModel} from "../search-model/searchModel";

export class SearchResult<T> extends SearchModel{
    result?: T[]
}