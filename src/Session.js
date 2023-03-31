import React from 'react'
import VideoAnnotator from './VideoAnnotator'
import './Session.css'

const URL_TEXT = "URL"
const URL_ID = "url"
const LOAD_VIDEO_TEXT = "LOAD YOUTUBE VIDEO URL"

// Parse the Id of the YouTube video. For e.g. for this Youtube
// URL https://www.youtube.com/watch?v=TcAAARgLZ8M the video id will be "TcAAARgLZ8M".
function getYTVideoId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return ''
    }
}

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

            // Whether to load video or not.
            load_video: false,
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

        this.setState(
            {
                load_video: true
            }
        )
    }

    render() {
        if (this.state.load_video) {
            return (
                <VideoAnnotator video_id={getYTVideoId(this.state.video_url)} />
            )
        }

        return (
            <div className="session">
                <div className="title">
                    <h1>Create A Custom Chat Bot For YouTube Videos</h1>
                </div>
                <div className="url-label">
                    <label>{URL_TEXT}</label>
                </div>
                <div className="url">
                    <input
                        id={URL_ID}
                        label={URL_TEXT}
                        variant="outlined"
                        onChange={this.updateInput}
                        value={this.state.video_url}
                    />
                </div>
                <div className="load">
                    <button
                        variant="contained"
                        onClick={this.handleLoadVideo}
                    >
                        {LOAD_VIDEO_TEXT}
                    </button>
                </div>
            </div>
        );

    }
}

export default Session