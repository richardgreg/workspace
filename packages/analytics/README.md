## Ethereum Transactions Elastic Search Importer

This project will connect to an RPC client, retrieve blocks and index all of the transactions in the block on elastic search. It is configured to work on multiple cores.

## Usage:

1. update config in `config.ts`

2. run `ts-node index.ts`


## Todo
1. Fork index operation in own thread (currently the program output seems to slow when awaiting the indexing operation)
2. Get transaction receipt data for all transactions 
3. delete & create elastic search index when program starts
4. keep track of indexed transactions