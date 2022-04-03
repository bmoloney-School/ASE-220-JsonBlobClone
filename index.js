const express = require("express");
const app = express()
const port = 3000
const blobPath = 'public/blobs/'
const multer = require('multer')
const upload = multer({ dest: blobPath })
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

    res.append('Location', 'localhost:' + port + '/api/jsonBlob/' + fileName)
    res.body = req.body
    res.send();
});







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
