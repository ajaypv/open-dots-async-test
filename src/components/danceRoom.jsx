import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const DanceRoom = () => {
    return (
        <div>
            <AudioPlayer
                autoPlay
                src="https://ia800708.us.archive.org/22/items/EdSheeranShapeOfYou_201811/Ed%20Sheeran%20-%20Shape%20Of%20You.mp3"
                onPlay={() => console.log("onPlay")}
                // other props here
            />
        </div>
    );
};

export default DanceRoom;