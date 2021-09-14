import { MongoClient } from 'mongodb';
const transactions = require('./transactionFixtures.json');
require('dotenv').config();

const uri = process.env.DB_URI;

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
