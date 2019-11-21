import {Response} from 'express';
export class ResponseUtil {
    public static responseSuccess(res: Response, obj: any) {
        console.log(obj);
        res.status(200).json(obj);
    }
    public static responseError(res: Response, err: any) {
        console.log(err);
        res.status(500).send(err);
    }
}
