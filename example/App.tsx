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
        // autoplay: true,
        controls: true,
        // responsive: true,
        fluid: true,
        techOrder: ['html5', 'youtube', 'vimeo'],
        sources: [{
            src: 'https://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
        }]
    };
    // vimeo: { color: "#042147" }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.autoplay('muted');

        player.addRemoteTextTrack({ src: './captions/oceans-captions_en.vtt', srclang: 'en', label: 'English', default: 1 });
        player.addRemoteTextTrack({ src: './captions/oceans-captions_da.vtt', srclang: 'da', label: 'Dansk' });

        player.on('loadstart', () => {
            console.log('loadstart');
        });

        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });

        player.on('ended', () => {
            console.log('player has ended');

            const { tracks_: remoteTextTracks } = player.remoteTextTracks();
            remoteTextTracks.forEach(track => {
                player.removeRemoteTextTrack(track);
            });

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