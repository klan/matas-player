import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { IMatasPlayer } from './interfaces';

export default function MatasPlayer(props: IMatasPlayer): JSX.Element {
    const { options, onReady } = props;
    const { captions, ...rest } = options;
    console.log({ options });
    
    const defaultOptions = {
        controls: true,
        responsive: true,
        breakpoints: {
            // tiny: 210, // 0-210
            xsmall: 320, // 211-320
            small: 680, // 321-680
            medium: 960, // 681-960
            large: 1280, // 961-1280
            xlarge: 1920 // 1281-1920
            // huge: 1921 // 1921+
        }
    }

    // console.log('options: ', { ...defaultOptions, ...rest });

    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        let player;
        if (!playerRef.current) {
            // initialize
            const videoElement = videoRef.current;
            if (!videoElement) return;

            player = playerRef.current = videojs(videoElement, { ...defaultOptions, ...rest }, () => {
                onReady && onReady(player);

                /* POST-READY OPTIONS */
                captions.forEach(caption => player.addRemoteTextTrack(caption));
                // console.log(player.remoteTextTracks());
            });
        } else {
            // update
            player = playerRef.current;

            player.src(options.sources);
        }

        /* OPTIONS */
        player.autoplay(options.autoplay ? 'muted' : false);
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;
    
        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-fluid vjs-big-play-centered" />
        </div>
    );
}