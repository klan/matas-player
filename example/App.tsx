import React, { useRef } from 'react';
import MatasPlayer from '../src/MatasPlayer';

import 'videojs-youtube/dist/Youtube.min';
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm';

export default function App() {
    const playerRef = useRef(null);

    /**
     * # Vimeo:
     * "Big Buck Bunny": https://vimeo.com/1084537
     * "730648 - prøvevideo": https://vimeo.com/518966582
     * 
     * # YouTube
     * "Fjernsyn for dig": https://www.youtube.com/watch?v=LiCMLHBaMZI
     */

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        techOrder: ['youtube', 'vimeo'],
        sources: [{
            src: 'https://vimeo.com/518966582',
            type: 'video/vimeo'
        }],
        vimeo: { color: "#042147" }
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

        player.on('ended', () => {
            console.log('player has ended');

            player.src([{
                src: 'https://www.youtube.com/watch?v=LiCMLHBaMZI',
                type: 'video/youtube'
            }])
        })
    };

    return (
        <MatasPlayer options={videoJsOptions} onReady={handlePlayerReady} />
    );
}