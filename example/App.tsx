import React, { useRef } from 'react';
import MatasPlayer from '../src/MatasPlayer';

import 'videojs-youtube/dist/Youtube.min';
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm';

export default function App() {
    const playerRef = useRef(null);

    /**
     * # Sources
     * mp4: https://vjs.zencdn.net/v/oceans.mp4
     * webm: https://vjs.zencdn.net/v/oceans.webm
     * 
     * # Vimeo:
     * "Big Buck Bunny": https://vimeo.com/1084537
     * "730648 - prøvevideo": https://vimeo.com/518966582
     * 
     * # YouTube
     * "Fjernsyn for dig": https://www.youtube.com/watch?v=LiCMLHBaMZI
     */

    const videoJsOptions = {
        autoplay: true,
        techOrder: ['html5', 'youtube', 'vimeo'],
        sources: [
            { src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }
        ],
        captions: [
            { src: './captions/oceans-captions_en.vtt', srclang: 'en', label: 'English', default: 1},
            { src: './captions/oceans-captions_da.vtt', srclang: 'da', label: 'Dansk' }
        ]
    };
    // vimeo: { color: "#042147" }

    const handlePlayerReady = (player) => {
        console.info('player ready');
        playerRef.current = player;

        /* events */
        player.on('loadstart', () => {
            console.info('loadstart');
        });

        player.on('waiting', () => {
            console.info('player is waiting');
        });

        player.on('dispose', () => {
            console.info('player will dispose');
        });

        player.on('ended', () => {
            console.info('player has ended');

            // cleanup
            const { tracks_: remoteTextTracks } = player.remoteTextTracks();
            remoteTextTracks.forEach(track => {
                player.removeRemoteTextTrack(track);
            });

            // start end video
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