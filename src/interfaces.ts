interface ISource {
    src: string;
    type: string;
}

interface ICaption {
    src: string;
    srclang: string;
    label: string;
    default: number;
}

export interface IMatasPlayer {
    options: {
        autoplay: boolean;
        techOrder: string[];
        sources: ISource[];
        captions?: ICaption[];
    }
    onReady: (playerInstance) => void;
}