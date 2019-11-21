import {User} from "../model/User";
import {Observable} from "rxjs";

export interface UserRepository {
    login(user: User): Observable<any>;
}
