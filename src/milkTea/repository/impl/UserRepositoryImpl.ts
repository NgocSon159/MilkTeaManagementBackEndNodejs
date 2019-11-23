import {UserRepository} from "../UserRepository";
import {User} from "../../model/User";
import {Observable, of} from "rxjs";
import {Db} from "mongodb";
import {MongoUtil} from "../../../common/util/MongoUtil";
import {flatMap} from "rxjs/operators";
import * as jwt from "jsonwebtoken";
import config from "../../../config";
import * as bcrypt from "bcrypt"
import {ResponseInfo} from "../../model/ResponseInfo";


export class UserRepositoryImpl implements UserRepository{
    constructor(private db: Db) {
    }

    login(user: any): Observable<any> {
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync("123456", salt);
        // $2b$10$zvtOmAQ5tQTVh.5qlnqXVOW5lqbx4s.eIBTbO5ztQ9lJNm90lw6Ei
        const query = {
            userName: user.userName
        };
        return MongoUtil.rxFindOne(this.db.collection("User"), query).pipe(flatMap(result => {
            if (result) {
                const match = bcrypt.compareSync(user.password, result['hashPassword']);
                if(match){
                    const token = jwt.sign(result,
                        config.SECRET_KEY,
                        { expiresIn: '5m'
                        }
                    );
                    const response: ResponseInfo = {
                        roleId: result["roleId"], token: token, userName: user.userName
                    };

                    return of(response);
                }
                else {
                    return of("Incorrect username or password");
                }
            }
            else {
                return of("Incorrect username or password");
            }
        }))
    }
    loginToken(token: string): Observable<any> {
        let response;
        jwt.verify(token, config.SECRET_KEY, function(err, decoded) {
            if(err) {
                response = err;
            } else { // Refresh token (create new token)
                delete decoded['exp'];
                delete decoded['iat'];
                const token = jwt.sign(decoded,
                    config.SECRET_KEY,
                    { expiresIn: '5m'
                    }
                );
                const response1: ResponseInfo = {
                    roleId: decoded["roleId"], token: token, userName: decoded.userName
                };

                response = response1;
            }
        });
        return of(response);

    }
}
