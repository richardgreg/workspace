const MongoClient = require('mongodb').MongoClient;
const transactions = require('./transactionFixtures.json');
require('@popcorn/utils/src/envLoader');

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mcgwt.mongodb.net`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('emissions');
    const collection = database.collection('transactions');
    const docs = transactions.transactions;
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} transactions were inserted`);
  } finally {
    await client.close();
  }
}

run().catch((err) => console.log(err));
