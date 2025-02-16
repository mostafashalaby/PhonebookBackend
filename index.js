require('dotenv').config();
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const app = express()

const Person = require('./models/person')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
      response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
  const Id = persons.length > 0
    ? Math.floor(Math.random() * 10001)
    : 0
  return String(Id)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    const currentTime = new Date();
    const info = `
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>Request received at: ${currentTime}</p>
    `;
    response.send(info);
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})