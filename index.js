const express = require('express');
const shortid = require('shortid');
const { body, validationResult } = require('express-validator');

const server = express();

let users = [
    {
      name: "Jane Doe",
      bio: "Not Tarzan's Wife, another Jane",
      id: shortid.generate(),
    },  
];

server.use(express.json())

server.get('/', (req, res) => {
    res.send('API is running')
})

server.post('/api/users', [
    body('name').isString().notEmpty(),
    body('bio').isString().notEmpty()
], (req, res) => {
    const userInfo = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return (
            res.status(400)
                .json({
                    errorMessage: "Please provide name and bio for the user.",
                    errors: errors.array()
                })
            );
    } else if(errors.isEmpty()) {
        return (
            res.status(201).json(userInfo),
            userInfo.id = shortid.generate(),
            users.push(userInfo)
        )
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})

server.get('/api/users/', (req, res) => {
    res.status(200).json(users)
    res.status(500).json({
        errorMessage: "The users information could not be retrieved."
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    let found = (users.find(user => user.id === id))
    
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({
            message: "User ID not found"
        })
    }
    
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    let deleteUser = (users.find(user => user.id === id))

    if (deleteUser) {

        users = users.filter(user => user.id !== id);
        res.status(200).json(deleteUser)
    } else {
        res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist."
        })
    }
});

server.put('/api/users/:id', [
    body('name').isString().notEmpty(),
    body('bio').isString().notEmpty()
], (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const errors = validationResult(req);
    
    let index = (users.findIndex(user => user.id === id));

    if (index !== -1) {
        users[index] = changes;
        res.status(200).json(users[index])
    } else {
        res.status(404).json({
            succes: false,
            message: "The user with the specified ID does not exist."
        })
    }
})


server.listen(8000, () => {
    console.log('API running on port 8000')
})