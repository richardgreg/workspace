const MongoClient = require('mongodb').MongoClient;
const transactions = require('./transactionFixtures.json');

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db('emissions');
    const movies = database.collection('transactions');
    const docs = transactions.transactions;
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await movies.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
