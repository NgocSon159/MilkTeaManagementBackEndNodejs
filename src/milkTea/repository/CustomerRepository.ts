import {Observable} from "rxjs";
import {Customer} from "../model/Customer";

export interface CustomerRepository {
    getById(id: string): Observable<Customer>;
}
