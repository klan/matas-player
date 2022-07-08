import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import type { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import type { IMatasPlayer } from './interfaces';
import registerTitleBar from './components/TitleBar';

export default function MatasPlayer(props: IMatasPlayer) {
    const { options, onReady } = props;
    const { tracks, ...rest } = options;
    // console.log({ options });

    const disabledComponents = ['controlBar', 'bigPlayButton', 'loadingSpinner'];

    const defaultOptions = {
        ...disabledComponents.reduce((accumulator, component) => ({ ...accumulator, [component]: false }), {}),
        controls: true,
        // children: [
        // //   "tech",
        //   "bigPlayButton",
        //   "controlBar",
        //   "poster",
        //   "loadingSpinner",
        //   "textTrackDisplay",
        //   "errorDisplay",
        //   "modaldialog",
        // ],
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
    };

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<VideoJsPlayer | null>(null);

    useEffect(() => {
        let player: VideoJsPlayer;
        if (!playerRef.current) {
            // initialize
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const initOptions: VideoJsPlayerOptions = { ...defaultOptions, ...rest };

            player = playerRef.current = videojs(videoElement, initOptions, () => {
                onReady && onReady(player);

                if (tracks) {
                    // add tracks after ready
                    tracks.forEach((track) => player.addRemoteTextTrack(track, false));
                    console.log(player.remoteTextTracks());
                }
            });
        } else {
            // update
            player = playerRef.current;

            player.src(options.sources);
        }

        /* OPTIONS */
        playerRef.current.autoplay(options.autoplay ? 'muted' : false);

        /**
         * Components guide: https://videojs.com/guides/components/
         * Component Class docs: https://docs.videojs.com/component
         */
        registerTitleBar(videojs, playerRef.current);
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
