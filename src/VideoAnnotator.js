import React from 'react';
import YouTube from 'react-youtube';

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
        }

        console.log("video_id: ", this.props.video_id)
        this.onReady = this.onReady.bind(this)
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
            </div>
        )
    }
}

export default VideoAnnotator