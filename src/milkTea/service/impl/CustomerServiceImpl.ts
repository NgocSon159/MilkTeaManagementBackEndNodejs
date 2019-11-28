import {Observable} from "rxjs";
import {Food} from '../../model/Food'
import {DiscountRepository} from "../../repository/DiscountRepository";
import {FoodSM} from "../../search-Model/FoodSM";
import {SearchResult} from "../../../common/model/SearchResult";
import {DiscountService} from "../DiscountService";
import {Discount} from "../../model/Discount";
import {CustomerService} from "../CustomerService";
import {Customer} from "../../model/Customer";
import {CustomerRepository} from "../../repository/CustomerRepository";

export class CustomerServiceImpl implements CustomerService {
    constructor(private customerRepository: CustomerRepository) {

    }

    getById(id: string): Observable<Customer> {
        return this.customerRepository.getById(id);
    }
}
