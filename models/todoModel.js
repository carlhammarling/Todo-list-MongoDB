/*
Det är i det här steget vi gör funktionerna som skapar objektet.
Men istället för att skriva och repetera massa kod i IF-satserna om hur objektet ska se ut , så har vi sparat det i ett Schema.
*/

//Stor bokstav eftersom den är en form av skapare.
const Todo = require('../schemas/todoSchema');



/* GET */

exports.getTodo = (req, res) => {
    Todo.find()
        .then(data => res.status(200).json(data))
        .catch(() => res.status(500).json({ message: 'Det blev knas.' }))
    }


/* POST */

exports.postTodo = (req, res) => {
    const { title, completed } = req.body
    if(!title) {
        res.status(400).json({ message: 'This turned out knas'})
        return
    }

    Todo.create({ title, completed })
        .then(data => res.status(201).json(data))
        .catch(() => res.status(500).json({ message: 'Lets fix this togheter.'}))

}


/* DELETE */

exports.deleteTodo = (req, res) => {
    const id = req.params.id

    Todo.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(500).json({ message: 'Wrong' })
                return
            }
            res.status(200).json({ id: data._id})
        })
        .catch(() => res.status(400).json({
            message: 'Something went wrong'
        }))


}

/* PUT */

exports.putTodo = (req, res) => {
    //{ new: true } används för att returnera nya objectet!
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            if(!data) {
                res.status(500).json({ message: 'Wrong' })
                return
            }
            res.status(200).json(data)
        })
        .catch(() => res.status(400).json({
            message: 'Something went wrong'
        }))


}

