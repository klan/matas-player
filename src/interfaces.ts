import type { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'

export interface IMatasPlayer {
    options: VideoJsPlayerOptions;
    onReady: (playerInstance: VideoJsPlayer) => void;
}
