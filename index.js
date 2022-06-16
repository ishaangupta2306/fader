const express = require('express')
const app = express()
const port = 2000
const contractSetup = require('./contractSetup')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/create/:name/:price', (req, res) => {
    console.log(req.params.name);
    console.log(req.params.price);
    let assetName = req.params.name;
    let assetPrice = req.params.price;
    createAssset(assetName, assetPrice)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/read/:assetID', (req, res) => {
    console.log(req.params.assetID);
    let assetID = req.params.assetID;
    readAsset(assetID)
})



    async function createAssset(assetName, assetPrice) {
         let contract = await contractSetup.setup()
        // Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
        // This type of transaction would only be run once by an application the first time it was started after it
        // deployed the first time. Any updates to the chaincode deployed later would likely not need to run
        // an "init" type function.
        console.log('\n--> Submit Transaction: CreateAsset, function creates the initial set of assets on the ledger');
        await contract.submitTransaction('CreateAsset', assetName, assetPrice);
        console.log('*** Result: committed');
    }


    async function readAsset(assetID) {
        const contract = await contractSetup.setup()
        // Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
        // This type of transaction would only be run once by an application the first time it was started after it
        // deployed the first time. Any updates to the chaincode deployed later would likely not need to run
        // an "init" type function.
        console.log('\n--> Submit Transaction: ReadAsset, function creates the initial set of assets on the ledger');
        let result = await contract.evaluateTransaction('ReadAsset', assetID);
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    }


function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}


