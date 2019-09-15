import {SearchModel} from "../search-model/searchModel";

export class SearchModelBuilder {
    public static buildSearchModel(obj: any) {
        // const keys = Object.keys(obj);
        // for ( let i = 0; i < keys.length; i++) {
        //     const key = keys[i];
        //     switch (key) {
        //         case 'pageIndex':
        //             obj['pageIndex'] = parseFloat(obj['pageIndex']) || 0;
        //         case 'pageSize':
        //             obj['pageSize'] = parseFloat(obj['pageSize']) || 0;
        //         case 'sortType':
        //             if (obj['sortType'] === 'ASC') {
        //                 obj['sortType'] = 1
        //             } else {
        //                 obj['sortType'] = -1
        //             }
        //         default:
        //             obj[key] = obj[key]
        //     }
        // }
        // return obj;
        if (obj['pageIndex']) {
            obj['pageIndex'] = parseFloat(obj['pageIndex']) || 1;
        } else {
            obj['pageIndex'] = 1;
        }
        if (obj['pageSize']) {
            obj['pageSize'] = parseFloat(obj['pageSize']) || 20;
        } else {
            obj['pageSize'] = 20;
        }
        if (obj['sortField']) {
            if (obj['sortType'] === 'ASC') {
                obj['sortType'] = 1
            } else {
                obj['sortType'] = -1
            }
        }
        return obj;

    }
    public static buildQuery(obj: any) {
        const sm: SearchModel = {pageIndex: 0, pageSize: 0, sortField: "", sortType: ""};
        const keyOfSM = Object.keys(sm);
        const query = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (keyOfSM.indexOf(key) < 0) {
                query[key] = obj[key];
            }
        }
        return query;
    }

    public static buildSort(obj: any) {
        const sort = {};
        if (obj['sortField']) {
            sort[obj['sortField']] = 1; //Default is ASC <=> 1
            if (obj['sortType']) {
                sort[obj['sortField']] = obj['sortType'];
            }
        }

        return sort;
    }
}