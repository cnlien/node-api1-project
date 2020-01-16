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

//===========================//
//    GET A LIST OF USERS    //
//===========================//
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "The users information could not be retrieved."});
        })
})

//===========================//
// GET A LIST OF USERS BY ID //
//===========================//
server.get('/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({user})
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })

        .catch (err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        });
});

//==========================================//
// ADD A NEW USER OBJECT TO THE USERS ARRAY //
//==========================================//

server.post ('/users', (req, res) => {
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    } else {
        db.insert(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error=> {
                res.status(500).json({error:"There was an error"});
            });
    }
});

//=============================================//
// UPDATE A NEW USER OBJECT TO THE USERS ARRAY //
//=============================================//
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({errorMessage: "There was an error while saving the user to the database"})
    } else {
        db.update(id, req.body)
        .then (user => {
            if (user) {
                res.status(200).json({user});
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch (err=> {
            res.status(500).json({ errorMessage: "The user information could not be modified." });
        });
    }

});

//=============================================//
// DELETE A NEW USER OBJECT TO THE USERS ARRAY //
//=============================================//
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then (deleteUser => {
            if(deleteUser) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch (err => {
            res.status(500).json({ errorMessage: "The user could not be removed" });
        });
});