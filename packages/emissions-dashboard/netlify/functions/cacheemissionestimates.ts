import Patch from '@patch-technology/patch';
import { MongoClient } from 'mongodb';
require('dotenv').config();

const GWEI_ETH_MULTIPLIER = Math.pow(10, 9);

exports.handler = async (event, context) => {
  try {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri);
    const patch = Patch(process.env.PATCH_API_KEY);
    // NOTE: Static date
    const date = new Date('2021/09/11');
    const patchEstimate = await patch.estimates.createEthereumEstimate({
      create_order: false,
      gas_used: GWEI_ETH_MULTIPLIER, // 1 ETH
      timestamp: date,
    });
    const res = {
      emissionsGpEth: patchEstimate.data.mass_g,
      date: date,
      timestamp: date.getTime() / 1000,
    };
    console.log({ res });
    await client.connect();
    const database = client.db('emissions');
    const query = { timestamp: res.timestamp };
    const update = { $set: res };
    const options = { upsert: true };
    const dbRes = await database
      .collection('patch-estimates')
      .updateOne(query, update, options);
    return { statusCode: 200, body: JSON.stringify(res) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch patch estimate' }),
    };
  }
};
