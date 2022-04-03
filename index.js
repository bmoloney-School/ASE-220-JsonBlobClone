const express = require("express");
const app = express()
const port = 3000
const blobPath = 'public/blobs/'
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');


const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api/jsonBlob', (req, res) => {
    let fileName = uuidv4();
    fs.writeFile(blobPath + fileName + '.json', JSON.stringify(req.body), function (err) {
        console.log(err)
    })

    res.append('Location', 'http://localhost:' + port + '/api/jsonBlob/' + fileName)
    res.body = req.body
    res.send();
});


app.put('/api/jsonBlob/:blobId', (req, res) => {
    let blobId = req.params.blobId;
    let fileName = blobPath + blobId + '.json'
    try {
        let contents = fs.readFileSync(fileName);
        fs.writeFile(fileName, JSON.stringify(req.body), function (err) {
            console.log(err)
        })
        res.send(req.body)
    }
    catch (e) {
        res.statusCode = 404;
        res.send({ message: 'Blob does not exist' });
    }
});

app.get('/api/jsonBlob/:blobId', (req, res) => {
    let blobId = req.params.blobId;

    try {
        let contents = fs.readFileSync(blobPath + blobId + '.json');
        res.send(contents);
    }
    catch (e) {
        res.send({ message: 'Blob does not exist' })
    }
});

app.delete('/api/jsonBlob/:blobId', (req, res) => {
    let blobId = req.params.blobId;

    try {
        let contents = fs.unlinkSync(blobPath + blobId + '.json');
        res.send({ message: 'Success' })
    }
    catch (e) {
        res.send({ message: 'Blob does not exist' })
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
