const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
} else if (process.argv.length === 4) {
    console.log('give name and number as arguments')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://mshalaby2002:${password}@fullstackopen.3mdgv.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String
})
  
const Person = mongoose.model('Person', personSchema)

const addPerson = ({name, number}) => {
      
    const person = new Person({
        name: name,
        number: number,
    })

    person.save()
        .then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

const showPersons = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}

if (process.argv.length === 5) {
    addPerson({name, number})
} else {
    showPersons()
}