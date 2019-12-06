import * as cors from 'cors';
import * as express from 'express';
import {Application} from 'express';
import * as bodyParser from 'body-parser';
import config from "../config";
import * as http from "http";
import {MongoUtil} from "../common/util/MongoUtil";
import {Db} from "mongodb";
import {MilkTeaRoute} from "./MilkTeaRoute";
import * as socketIo from 'socket.io';

const MongoUrl = config.MONGO.URL;
const Database = config.MONGO.DB;
const PoolSize = config.MONGO.POOL_SIZE;

const PORT = config.HTTP_PORT;
const SOCKETPORT = config.SOCKET_PORT;

export class App {
    protected app: Application;
    public getApp(): Application {
        return this.app;
    }

    constructor(protected mongoUrl: string, protected database: string, protected poolSize: number) {
        this.app = express();
        this.config();
        const mongoUtil = new MongoUtil(mongoUrl, database, poolSize);
        mongoUtil.mongoSetup().subscribe(db => {
            console.log('Connect Done!!!');
            this.setupRoute(db);
        }, error => {
            console.log('Error Mongo: ', error);
        });}


    protected config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        // serving static files
        this.app.use(express.static('public'));
    }
    protected setupRoute(db: Db) {
        const milkTeaRoute = new MilkTeaRoute(db);
        milkTeaRoute.routes(this.app);
    }

}

const app = new App(MongoUrl, Database, PoolSize);
const server = http.createServer(app.getApp());



const io = socketIo(server);
io.listen(SOCKETPORT);
server.listen(PORT, () =>{
    console.log('HTTP Express server listening on port ' + PORT);
});
let arr = [];

function checkExist(userName: string) {
    let flag = false;
    arr.map((item: any) => {
        if(item.userName === userName) {
            flag = true;
        }
    })
    return flag;
}

function sendMessageToBarista() {
    arr.map((item: any) => {
        if(item.roleId === 'RBarista') {
            item.socket.emit('plsUpdateKitchen')
        }
    })
}

function sendMessageToCashier() {
    arr.map((item: any) => {
        if(item.roleId === 'RCashier') {
            item.socket.emit('plsUpdateCashier')
        }
    })
}

function sendMessageToWaiter() {
    arr.map((item: any) => {
        if(item.roleId === 'RWaiter') {
            item.socket.emit('plsUpdateWaiter')
        }
    })
}

function checkConnect() {
    let newArr = [];
    arr.map((item: any) => {
        if(item.socket.connected === true) {
            newArr.push(item);
        }
    })
    arr = newArr;
}
io.on('connection', (socket: any) => {
    console.log(socket.id);
    console.log('Connected client on port %s.', PORT);
    socket.on('sendUserName', (loginInfo) => {
        if(loginInfo && loginInfo !== undefined) {
            if(!checkExist(loginInfo.userName)) {
                const user = {
                    socket: socket,
                    userName: loginInfo.userName,
                    roleId: loginInfo.roleId
                };

                arr.push(user);
                console.log('data', loginInfo.userName, loginInfo.roleId);
                console.log('socket', socket.id);
                console.log('arr', arr);
            }
        }
        // this.io.emit('message', m);
    });

    socket.on('baristaUpdate', () => {
        console.log('baristaUpdate');
        sendMessageToBarista();
    });

    socket.on('cashierUpdate', () => {
        console.log('cashierUpdate');
        sendMessageToCashier();
    });

    socket.on('waiterUpdate', () => {
        console.log('waiterUpdate');
        sendMessageToWaiter();
    });

    socket.on('disconnect', (socket) => {
        checkConnect();
    });
});
