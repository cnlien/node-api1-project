const express = require('express');
const shortid = require('shortid');
const { body, validationResult } = require('express-validator');

const server = express();
server.use(express.json())

let users = [
    {
        id: 1,
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",
    }
]

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

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
    res.status(500).json({
        errorMessage: "The users information could not be retrieved."
    })
})


server.listen(8000, () => {
    console.log('API running on port 8000')
})