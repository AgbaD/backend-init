const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv/config')
const Image = require('./model');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("view engine", "ejs");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            const error = new Error("Only .PNG, .JPG and .JPEG files allowed.");
            error.status = 400;
            cb(error, false);
        }
    },
    limits: {
        fileSize: 5242880,
    },
}).array("images", 5);

app.get('/', (req, res) => {
    Image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagePage', { items: items });
        }
    })
})

app.post('/', upload, (req, res, next) => {

    for (let file of req.files) {
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename)),
                contentType: 'image/png'
            }
        }
        Image.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                console.log(item)
                return res.status(200).json("success")
            }
        });
    }
});

// DB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connection successful")
        const port = process.env.PORT;
        app.listen(port || 5000, () => {
            console.log(`Server listening on port ${port}...`)
        })
    })
    .catch((err) => {
        console.log(err)
    })