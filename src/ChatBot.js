import React from 'react'
import Constants from './Constants.js'
import { handleFetchErrors } from './Helpers.js'
import './ChatBot.css'

const ASK_QUESTION_BUTTON_LABEL = "ASK QUESTION"
const QUESTION_FIELD_ID = "question"
const RESPONSE_FIELD_ID = "response"

class ChatBot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question_content: '',
            response_content: ''
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleAskQuestion = this.handleAskQuestion.bind(this)
    }

    // Updates the text input values in this component.
    updateInput(e) {
        console.log('updateInput')
        const value = e.target.value
        const id = e.target.id

        if (id === QUESTION_FIELD_ID) {
            this.setState({
                question_content: value
            })
        } else if (id === RESPONSE_FIELD_ID) {
            this.setState({
                response_content: value
            })
        } else {
            console.log("Unrecognized input field")
        }
    }

    handleAskQuestion() {
        let route_to_fetch = Constants.SERVER + Constants.SERVER_ROUTE_ASK_QUESTION
        console.log('Fetching: ', route_to_fetch)
        fetch(route_to_fetch,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ video_id: this.props.video_id, query: this.state.question_content }),
            }
        ).then(handleFetchErrors)
            .then(response => {
                console.log("handleAskQuestion response: ", response)
                return response.json()
            }
            )
            .then(data => {
                console.log("handleAskQuestion data: ", data)
                this.setState(
                    {
                        response_content: data.response
                    }
                )
            })
            .catch(error => {
                console.log("Request error: " + error)
            })
    }

    render() {
        return (
            <div className="chatbot-container">
                <input id={QUESTION_FIELD_ID} onChange={this.updateInput} className="input-box" placeholder="Ask a question..." />
                <button onClick={this.handleAskQuestion} className="ask-question-button">{ASK_QUESTION_BUTTON_LABEL}</button>
                <textarea
                    id={RESPONSE_FIELD_ID}
                    className="output-box"
                    value={this.state.response_content}
                    onChange={this.updateInput}
                    placeholder="Response..."
                    readOnly
                />
            </div>
        );
    }
}

export default ChatBot