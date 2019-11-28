import {Observable} from "rxjs";
import {Customer} from "../model/Customer";

export interface CustomerService {
    getById(id: string): Observable<Customer>;
}
