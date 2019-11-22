import {User} from "../model/User";
import {Observable} from "rxjs";

export interface UserRepository {
    login(user: any): Observable<any>;
    loginToken(token: string): Observable<any>;
}
