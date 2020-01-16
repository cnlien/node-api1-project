// implement your API here
const db = require('./data/db.js');
const express = require('express');

const server = express();

server.listen(4000, () => {
    console.log('===server listening on port 4000===')
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Node API Project 1');
})

server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({success: false, err});
        })
})

server.get('/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user})
            } else {
                res.status(404).json({ success: false, messsage: 'id no found'});
            }
        })

        .catch (err => {
            res.status(500).json({ success: false, err })
        });
});

