import { MongoClient, Collection, Document } from "mongodb";

type NameOfCollection = "chat"

export const executeInDB = async <T=any>( nameOfCollection: NameOfCollection ,query: (collection: Collection<Document>) => Promise<T>) => {
    const client = await MongoClient.connect('mongodb+srv://admin:admin@swiftcluster.q0cl75k.mongodb.net/');

    const db = client.db("codecamp");

    const collection = db.collection(nameOfCollection);

    const result = await query(collection);

    client.close();

    return result
}


// export const executeInDB = async <T=any>(query: (db: Db) => Promise<T>) => {
//     const client = await MongoClient.connect('mongodb+srv://admin:admin@swiftcluster.q0cl75k.mongodb.net/');

//     const db = client.db("codecamp");

//     const result = await query(db);

//     client.close();

//     return result;
// }