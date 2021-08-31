import { MongoClient } from 'mongodb';

exports.handler = async (event, context) => {
  try {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const startBlock = event.queryStringParameters.startBlock;
    const endBlock = event.queryStringParameters.endBlock;
    await client.connect();
    const database = client.db('emissions');
    const collection = database.collection('transactions');
    const cursor = collection.find({
      $and: [
        {
          $expr: {
            $gt: [{ $toInt: '$blockNumber' }, startBlock],
          },
        },
        {
          $expr: {
            $lt: [{ $toInt: '$blockNumber' }, endBlock],
          },
        },
      ],
    });

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log('No documents found!');
    }
    // replace console.dir with your callback to access individual elements
    const transactions = await cursor.forEach(console.dir);
    return { statusCode: 200, body: JSON.stringify(transactions) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching transactions' }),
    };
  }
};
