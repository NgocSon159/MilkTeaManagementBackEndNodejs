import {Observable} from "rxjs";
import {
    Collection,
    Db,
    DeleteWriteOpResultObject,
    FindAndModifyWriteOpResultObject,
    InsertOneWriteOpResult,
    MongoClient
} from "mongodb";
import {fromPromise} from "rxjs/internal-compatibility";

export class MongoUtil {
    constructor(private url: string, private databaseName: string, private poolSize: number) {

    }
    public mongoSetup(): Observable<Db> {
        return fromPromise(this.createConnection(this.url, this.databaseName, 'admin', this.poolSize));
    }
    public createConnection(uri: string, dbName: string, authSource = 'admin', poolSize = 5): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, authSource, poolSize }, (err, client: MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Connected successfully to MongoDB serverTest');
                    const db: Db = client.db(dbName);
                    resolve(db);
                }
            });
        });
    }
    public static rxFind<T>(collection: Collection, query: any, sort?: any, limit?: number, skip?: number, project?: any): Observable<Array<T>> {
        return fromPromise(new Promise<Array<T>>((resolve, reject) => {
            let findMethod = collection.find(query);
            if (sort) {
                findMethod = findMethod.sort(sort);
            }
            if (limit) {
                findMethod = findMethod.limit(limit);
            }
            if (skip) {
                findMethod = findMethod.skip(skip);
            }
            if (project) {
                findMethod = findMethod.project(project);
            }

            findMethod.toArray((err, items: Array<T>) => {
                if (err) {
                    return reject(err);
                }
                return resolve(items);
            });
        }));
    }

    public static rxFindOne<T>(collection: Collection, query: any): Observable<T> {
        return fromPromise(new Promise<T>((resolve, reject) => {
            collection
                .findOne(query, (err, item: T) => {
                    if (err !== null) {
                        return reject(err);
                    }
                    return resolve(item);
                });
        }));
    }

    public static rxCount(collection: Collection, object: any = {}): Observable<any> {
        return fromPromise(new Promise(((resolve, reject) => {
            collection.count({}, function(error, numOfDocs){
                if (error !== null) {
                    return reject(error);
                }
                return resolve(numOfDocs);
            });
        })));
    }

    public static rxInsert<T>(collection: Collection, object: any): Observable<T> {
        return fromPromise(new Promise<T>(((resolve, reject) => {
            collection.insertOne(object, (err, result: InsertOneWriteOpResult<T>) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.ops[0]);
            });
        })));
    }

    public static rxUpdate<T>(collection: Collection, query: any, object: any): Observable<T> {
        return fromPromise(new Promise<T>(((resolve, reject) => {
            collection.findOneAndUpdate(query, {$set: object}, {returnOriginal: false}, (err, result: FindAndModifyWriteOpResultObject) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.value);
            });
        })));
    }

    public static rxDeleteById(collection: Collection, _id: any): Observable<number> {
        return fromPromise(new Promise<number>(((resolve, reject) => {
            if (!_id) {
                return resolve(0);
            }
            collection.deleteOne({_id}, (err, result: DeleteWriteOpResultObject) => err ? reject(err) : resolve(result.deletedCount));
        })));
    }


    public static rxFindWithAggregate<T>(collection: Collection, query: any): Observable<Array<T>> {
        return fromPromise(new Promise<Array<T>>(((resolve, reject) => {
            collection.aggregate(query, (error, result: any) => {
                result.toArray(function (err, items) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(items);
                });
            });
        })));
    }
}
