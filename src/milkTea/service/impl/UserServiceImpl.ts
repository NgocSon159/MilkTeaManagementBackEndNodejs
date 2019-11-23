import {UserService} from "../UserService";
import {User} from "../../model/User";
import {Observable} from "rxjs";
import {UserRepository} from "../../repository/UserRepository";

export class UserServiceImpl implements UserService{
    constructor(private userRepository: UserRepository) {

    }
    login(user: any): Observable<any> {
        return this.userRepository.login(user);
    }

    loginToken(token: string): Observable<any> {
        return this.userRepository.loginToken(token);
    }
}
