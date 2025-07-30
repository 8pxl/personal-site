export enum AnimType {
    Fade = "fade",
    SlideUp = "slide-up",
    SlideDown = "slide-down",
    FadeUpScroll = "fade-up-s"
};

export enum AnimSelector {
    Fade = '.' + AnimType.Fade,
    SlideUp = '.' + AnimType.SlideUp,
    SlideDown = '.' + AnimType.SlideDown,
    FadeUpScroll = '.' + AnimType.FadeUpScroll
};