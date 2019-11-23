import {Request, Response} from "express";
import {ResponseUtil} from "../../common/util/ResponseUtil";
import {User} from "../model/User";
import {UserService} from "../service/UserService";
import * as jwt from "jsonwebtoken";

export class UserController {
    constructor(private userService: UserService) {
    }

    login(req: Request, res: Response) {
        const token = req.header("token");
        if(token) {
            return this.userService.loginToken(token).subscribe(result => {
                if (result instanceof jwt.JsonWebTokenError) {
                    return ResponseUtil.responseError(res, result);
                } else {
                    return ResponseUtil.responseSuccess(res, result);
                }

            }, error => {
                return ResponseUtil.responseError(res, error);
            });
        } else {
            const user: User = req.body;
            return this.userService.login(user).subscribe(result => {
                const a = result.toString();
                if (a.indexOf("Incorrect") > -1) {
                    return ResponseUtil.responseError(res, result);
                } else {
                    return ResponseUtil.responseSuccess(res, result);
                }

            }, error => {
                return ResponseUtil.responseError(res, error);
            });
        }
    }
}
