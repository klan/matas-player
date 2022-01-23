import React, { useRef } from 'react';
import MatasPlayer from '../src/MatasPlayer';
import 'videojs-youtube/dist/Youtube.min.js';

export default function App() {
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        techOrder: ['youtube'],
        sources: [{
            src: 'https://www.youtube.com/watch?v=LiCMLHBaMZI',
            type: 'video/youtube'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    // const changePlayerOptions = () => {
    //   // you can update the player through the Video.js player instance
    //   if (!playerRef.current) {
    //     return;
    //   }
    //   // [update player through instance's api]
    //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
    //   playerRef.current.autoplay(false);
    // };

    return (
        <MatasPlayer options={videoJsOptions} onReady={handlePlayerReady} />
    );
}