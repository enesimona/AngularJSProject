'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodequestionss', 'root', '')

let app = express()

app.use(express.static(__dirname + '/app'))
app.use("/styles", express.static(__dirname + '/styles'));
app.use(bodyParser.json())
app.locals.topics = []

let Topic = sequelize.define('topic', {
  topic_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  opening_date: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  category: {
      allowNull:false,
      type:Sequelize.STRING
  }
})

let Question = sequelize.define('question', {
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  content: {
    allowNull: false,
    type: Sequelize.TEXT,
    validate: {
      len: [5, 1000]
    }
  }
})

Topic.hasMany(Question, {
  foreignKey: 'topicId'
})
Question.belongsTo(Topic, {
  foreignKey: 'topicId'
})

app.get('/create', (req, res) => {
  sequelize
    .sync()
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/topics', (req, res) => {
  Topic
    .findAll({
      attributes: ['id', 'topic_name', 'opening_date', 'category']
    })
    .then((topics) => {
      res.status(200).send(topics)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/topics/:id', (req, res) => {
  Topic
    .find({
      attributes: ['id', 'topic_name', 'opening_date', 'category'],
      where: {
        id: req.params.id
      }
    })
    .then((topic) => {
      res.status(200).send(topic)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.post('/topics', (req, res) => {
  Topic
    .create(req.body)
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.put('/topics/:id', (req, res) => {
  Topic
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((topic) => {
      return topic.updateAttributes(req.body)
    })
    .then(() => {
      res.status(201).send('modified')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.delete('/topics/:id', (req, res) => {
  Topic
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((topic) => {
      return topic.destroy()
    })
    .then(() => {
      res.status(201).send('removed')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/topics/:id/questions', (req, res) => {
  Topic
    .find({
      where: {
        id: req.params.id
      },
      include: [Question]
    })
    .then((topic) => {
      return topic.getQuestions()
    })
    .then((questions) => {
      res.status(200).send(questions)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/topics/:id/questions/:mId', (req, res) => {
  Question
    .find({
      attributes: ['id', 'title', 'content'],
      where: {
        id: req.params.mId
      }
    })
    .then((question) => {
      res.status(200).send(question)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.post('/topics/:id/questions', (req, res) => {
  Topic
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((topic) => {
      let question = req.body
      question.topicId = topic.id
      return Question.create(question)
    })
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })

})

app.put('/topics/:id/questions/:mId', (req, res) => {
  Question
    .find({
      where: {
        id: req.params.mId
      }
    })
    .then((question) => {
      question.title = req.body.title
      question.content = req.body.content
      return question.save()
    })
    .then(() => {
      res.status(201).send('modified')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.delete('/topics/:id/questions/:mId', (req, res) => {
  Question
    .find({
      where: {
        id: req.params.mId
      }
    })
    .then((question) => {
      return question.destroy()
    })
    .then(() => {
      res.status(201).send('removed')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })

})


app.listen(8080)
