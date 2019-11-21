import {Observable} from "rxjs";
import {User} from "../model/User";

export interface UserService {
    login(user: User): Observable<any>;
    loginToken(token: string): Observable<any>;
}
