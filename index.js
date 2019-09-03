// implement your API here
const express = require('express');
const server = express();
server.use(express.json());
const DB = require('./data/db');

const port = 3333;
server.listen(port, () => console.log(`server is listening on port ${port}`))

server.get('/api/users', (req, res) => {
    DB.find()
        .then(db => {
            res.status(200).json(db)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving list of users' })
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    DB.findById(userId)
        .then(db => {
            res.status(200).json(db)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving user' })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body;

    DB.insert(user)
        .then(db => {
            res.status(200).json(db)
        })
        .catch(error => {
            res.status(500).json({ message: 'error creating user' })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    DB.remove(userId)
        .then(db => {
            res.status(200).json({ message: 'user deleted successfully' })
        })
        .catch(error => {
            res.status(200).json({ message: 'error deleting user' })
        })
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const userUpdate = req.body;

    DB.update(userId, userUpdate)
        .then(db => {
            res.status(200).json({ message: 'user updated successfully' })
        })
        .catch(error => {
            res.status(200).json({ message: 'error updating user' })
        })
})