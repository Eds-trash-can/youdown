class contwatch {
    constructor(v) {
        this.videos = v
    }
}

class videoplayer {
    constructor(container, video) {
        this.container = container;
        this.videoid = video;

        $(this.container).html(this.html)
    }
    get html() {
        return `<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.slidesharecdn.com%2Fultimatetestpatternslides-170322155753%2F95%2Fultimate-video-engineer-16x9-test-pattern-2-638.jpg%3Fcb%3D1490198558&f=1&nofb=1" alt="" style="height: 100%; width: 100%; top:0;">
        <div class="videoplayer-controlls">
            <div class="play">
                <img class="play-img clickable" src="/static/play.svg">
            </div>
            <div class="skip-next">
                <img class="skip-next-img clickable" src="/static/next.svg">
            </div>
            <div class="timetxt">
                <span class="timetxt-content">
                    12:47 / 21:01
                </span>
            </div>
            <div class="timebar clickable">
                <div class="timebar-progress" style="width: 54.32%;">
                </div>
            </div>
            <div class="cc">
                <img src="/static/cc-off.svg" class="cc-img clickable">
            </div> 
            <div class="settings">
                <img src="/static/settings.svg" class="settings-img clickable">
            </div>
            <div class="pip-activate">
                <img class="pip-symbol clickable" src="/static/pip.svg">
            </div>
            <div class="fullscreen-toggle">
                <img class="fullscreen-toggle-img clickable" src="/static/fullscreen-off.svg">
            </div>
        </div>`
    }
    pause(v) { // 
        if(v) {
            this.playing = v
            return this.play(v)
        } else {
            this.playing = false
            return this.play(false)
        }
    }
    play(v) {}
}

$(document).ready(() => {
    continue_watching = new contwatch(recommended.getrecommended) /* still tmp */
    menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay");
    player = new videoplayer(".videoplayer-container")

    $(".menu-toggle").click(() => menu.toggle())

})
