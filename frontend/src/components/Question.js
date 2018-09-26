import React, { Component } from 'react'
import { Button, Title } from 'bloomer'
import { NavLink } from 'react-router-dom'
import Card from './Card'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined,
      answers: [],
      currentAnswer: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setStateInQuestion = this.setStateInQuestion.bind(this)
  }
  setStateInQuestion (value) {
    this.setState({ currentAnswer: value })
  }
  componentDidMount () {
    let quizID = this.props.quizId
    let questionID = this.props.id
    this.getQuestion(quizID, questionID)
    this.getAnswers(quizID, questionID)
  }
  getQuestion (quizID, questionID) {
    apiCalls.getQuestion(quizID, questionID).then(question => {
      this.setState({ question })
    })
  }
  getAnswers (quizID, questionID) {
    apiCalls.getAnswers(quizID, questionID).then(answers => {
      this.setState({ answers })
    })
  }
  setNewQuestion (newQuestion) {
    this.setState({ question: newQuestion })
  }
  handleSubmit (e) {
    let quizID = this.props.quizId
    let questionID = this.props.id
    let answerID = this.state.currentAnswer
    apiCalls.submitAnswer(answerID, quizID, questionID)
    apiCalls.getQuiz(quizID).then(response => {
      let newQuestion = response.relationships.questions
      this.setNewQuestion(newQuestion)
    })
  }
  render () {
    const { id, quizId } = this.props
    if (this.state.question && this.state.question.data.attributes.text) {
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      let nextQuesionId = parseInt(id) + 1
      return (
        <Card>
          <div>
            <Title><h1> Question 1 {question}</h1></Title>
            {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
            <Button className='is-warning' value={links} onClick={e => this.handleSubmit(e)}>Submit Answer</Button>
            &nbsp;
            <Button className='is-warning'><NavLink to={`quiz/${quizId}/question/${nextQuesionId}`}>Next Question</NavLink></Button>
          </div>
        </Card>
      )
    } else {
      return ('')
    }
  }
}
export default Question
