import React from 'react';
import Constants from './Constants.js';
import YouTube from 'react-youtube';
import ChatBot from './ChatBot.js';
import { handleFetchErrors } from './Helpers.js';

const VIDEO_PLAYER_ID = "video-player"

// TODO: Figure out a way to make this part of |state|.
let player = null

// This component -
// - Loads a Youtube player with the given |video_id|.
// - Adds option to ask a bot based on the Video questions.
class VideoAnnotator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // The handle to the embedded Youtube player associated with a video.
            player: null,

            // The tile of the video being annotated.
            video_title: '',

            // Set to true while a video's bot is being loaded.
            loading_bot: true,
        }

        console.log("video_id: ", this.props.video_id)
        this.createBot = this.createBot.bind(this)
        this.onReady = this.onReady.bind(this)
    }

    createBot() {
        let route_to_fetch = Constants.SERVER + Constants.SERVER_ROUTE_CREATE_BOT
        console.log('Fetching: ', route_to_fetch)
        fetch(route_to_fetch,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ video_id: this.props.video_id }),
            }
        ).then(handleFetchErrors)
            .then(response => {
                console.log("handleCreateBot response: ", response)
                return response.json()
            }
            )
            .then(data => {
                this.setState(
                    {
                        loading_bot: false
                    }
                )
            })
            .catch(error => {
                console.log("Request error: " + error)
            })

    }

    // Called when the YouTube player is ready.
    onReady(event) {
        // Access to |player| in all event handlers via event.target
        //event.target.pauseVideo();
        console.log('onReady title: ' + event.target.getVideoData().title)
        this.setState(
            {
                video_title: event.target.getVideoData().title
            }
        )
        player = event.target
    }

    componentDidMount() {
        // Ask to create bot once the video player is ready, else the user may start asking
        // questions before the video is playing (which is bad UX).
        this.createBot()
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return (
            <div>
                <YouTube videoId={this.props.video_id}
                    opts={opts}
                    id={VIDEO_PLAYER_ID}
                    onReady={this.onReady}
                />
                {this.state.loading_bot ? (
                    <h2>Loading Bot...</h2>
                ) : (
                    <ChatBot video_id={this.props.video_id} />
                )}
            </div>
        )
    }
}

export default VideoAnnotator