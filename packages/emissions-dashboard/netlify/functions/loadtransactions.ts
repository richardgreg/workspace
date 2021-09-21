import { MongoClient } from 'mongodb';
require('dotenv').config();

exports.handler = async (event, context) => {
  try {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri);
    const startDate = new Date(event.queryStringParameters.startDate);
    const endDate = new Date(event.queryStringParameters.endDate);
    await client.connect();
    const database = client.db('emissions');
    const transactions = await database
      .collection('transactions')
      .find({
        $and: [
          {
            date: {
              $gt: startDate,
            },
          },

          {
            date: {
              $lte: endDate,
            },
          },
        ],
      })
      .toArray();
    client.close();
    return { statusCode: 200, body: JSON.stringify(transactions) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching transactions' }),
    };
  }
};
