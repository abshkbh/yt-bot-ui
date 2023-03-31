import React from 'react'

const URL_TEXT = "URL"
const URL_ID = "url"
const LOAD_VIDEO_TEXT = "LOAD YOUTUBE VIDEO URL"

// This component is loaded after a user is logged in.
//
// It has an input to load a new video for annotation and also shows the list of vidoes annoatated
// by the user.
class Session extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // URL of the video to annotate.
            video_url: '',
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleLoadVideo = this.handleLoadVideo.bind(this)
    }

    // Updates the text input values in this component.
    updateInput(e) {
        console.log('updateInput')
        const value = e.target.value
        const id = e.target.id

        if (id === URL_ID) {
            this.setState({
                video_url: value
            })
        } else {
            console.log("Unrecognized input field")
        }
    }

    // Callback for the |LOAD_VIDEO_TEXT| button.
    handleLoadVideo() {
        console.log('handleLoadVideo url:' + this.state.video_url)
        if (!this.state.video_url || this.state.video_url === '') {
            console.log('Video URL empty')
            return
        }
        //TODO: Call the YT player UI.
    }

    render() {
        return (
            <div className="session">
                <div className="url-label">
                    <label>{URL_TEXT}</label>
                </div>
                <div className="url">
                    <input id={URL_ID} label={URL_TEXT}
                        variant="outlined"
                        onChange={this.updateInput}
                        value={this.state.video_url} />
                </div>
                <div className="load">
                    <button variant="contained" onClick={this.han}>{LOAD_VIDEO_TEXT}</button>
                </div>
            </div>
        );

    }
}

export default Session