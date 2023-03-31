import React from 'react'
import Constants from './Constants.js'
import { handleFetchErrors } from './Helpers.js'

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
                        response: data.response
                    }
                )
            })
            .catch(error => {
                console.log("Request error: " + error)
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleAskQuestion}>{ASK_QUESTION_BUTTON_LABEL}</button>
                <input id={QUESTION_FIELD_ID} onChange={this.updateInput} />
                <text id={RESPONSE_FIELD_ID}></text>
            </div>
        )
    }
}

export default ChatBot