function getCookie(cname) { //thx www.w3schools.com/js/js_cookies.asp
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
class contwatch {
    constructor(v) {
        this.videos = v
        this.parsed = {}
    }
}
class videoplayer {
    constructor(container, video, o) { // o = optionall {}
        this.container = container;
        this.videoid = video;

        // set html
        fetch(`/video-api/${this.videoid}`).then(d => d.json()).then(d => this.setup(d, o))
    }

    setup(a, o) {
        this.parsed = a
        $(this.container).html(this.html())
        $(".cntrls-dimmarea").width($(".cntrls-dimmarea").width())
        // videocontrolls onto this.video
        this.video = $(".videocontainer")
        
        // clickable stuff:
        $(".play-img")             .click(() => {player.pp()})
        $(".cc-img")               .click(() => {player.cc()})
        $(".fullscreen-toggle-img").click(() => {player.fs()})
        $(".videocontainer")       .click(() => {player.pp()})
        $(".volume-slider-cntrl")  .on("change", () => {player.volume(($(".volume-slider-cntrl").val()/1000))})

        // just to be sure
        this.pp(false)
        this.cc(false)
        this.fs(false)

        // optional arguments
        if(o["from"]) {
            this.seek(o["from"])
        }

        // time update
        this.video.on("timeupdate", () => {
            let ct = this.video[0].currentTime;
            let md = this.video[0].duration;
            let dura = new Date(this.video[0].duration * 1000).toISOString().substr(11,8).split(":")
            let pass = new Date(ct * 1000).toISOString().substr(11,8).split(":")

            // progress bar (the red thing)
            let percentage = 100 * ct / md;
            $(".timebar-progress").css("width", `${percentage}%`)

            // passed time the 0:01 / 1:01
            let p = ""
            let d = ""
            if(dura[0] != "00") {
                d += pass[0] + ":"
                p += dura[0] + ":"
            }
            if(dura[1] != "00") {
                d += pass[1] + ":"
                p += dura[1] + ":"
            }
            if(dura[2] != "00") {
                d += pass[2]
                p += dura[2]
            }
            $(".timetxt-content").html(`${d} / ${p}`)

        })
        this.tD = false
        $(".timebar").mousedown((e) => {
            this.tD = true;
            this.updateBar(e.pageX)
        });
        $(document).mouseup((e) => {
            if(this.tD) {
                this.tD = false;
                this.updateBar(e.pageX)
            }
        })
        $(document).mousemove((e) => {
            if(this.tD) {
                this.updateBar(e.pageX)
            }
        })

        // volume stuff read volume from cookies
        this.volume()

    }
    html(a) {
        return `<video class="videocontainer"><source class="video" src="${this.parsed.src}" type="video/mp4"></video>
        <div class="cntrls-dimmarea">
        <div class="videoplayer-controlls">
            <div class="play">
                <img class="play-img clickable" src="/static/play.svg">
            </div>
            <div class="skip-next">
                <img class="skip-next-img clickable" src="/static/next.svg">
            </div>
            <div class="volume">
                <img class="volume-img clickable" src="/static/volume.svg">
            </div>
            <div class="volume-slider">
                <input type="range" min="0" max="1000" class="volume-slider-cntrl">
            </div>
            <div class="timetxt">
                <span class="timetxt-content">
                    0:00 / 0:00
                </span>
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
            <div class="timebar clickable">
                <div class="timebar-progress" style="width: 0%;">
            </div>
        </div>
        </div>
        </div>`
    }
    pp(v) { // toggle for playpause; v = overwrite
        if(typeof(v) == "boolean") {
            this.playing = v
        } else {
            this.playing = !this.playing
        }
        if(this.playing) {
            $(".play-img").attr({"src": "/static/pause.svg"})
            this.video[0].play()
        } else {
            $(".play-img").attr({"src": "/static/play.svg"})
            this.video[0].pause()
        }
        return this.playing
    }
    cc(v) { // toggle for captions; v = overwrite
        if(typeof(v) == "boolean") {
            this.captions = v
        } else {
            this.captions = !this.captions
        }
        if(this.captions) { 
            $(".cc-img").attr({"src": "/static/cc-on.svg"})
        } else {
            $(".cc-img").attr({"src": "/static/cc-off.svg"})
        }
        return this.captions
    }
    fs(v) { // toggle for fullscreen; v = overwrite
        if(typeof(v) == "boolean") {
            this.fullscreen = v
        } else {
            this.fullscreen = !this.fullscreen
        }
        let doc = document.documentElement;
        if(this.fullscreen) {
            $(".fullscreen-toggle-img").attr({"src": "/static/fullscreen-on.svg"})
        } else {
            $(".fullscreen-toggle-img").attr({"src": "/static/fullscreen-off.svg"})
        }
        return this.fullscreen
    }
    seek(s) { // api function for seeking
        // placeholder
        console.log(`[videoplayer] seeked to ${s}`)
        return this.video[0].currentTime = s
        
    }
    updateBar(x) {
        let progress    = $(".timebar");
        let maxduration = this.video[0].duration;
        let position    = x - progress.offset().left
        let percentage  = 100 * position / progress.width()

        if(percentage > 100) {
            percentage = 100
        }
        if(percentage < 0) {
            percentage = 0;
        }

        $(".timebar-progress").css("width", percentage+"%");
        this.seek(maxduration * percentage / 100)
        console.log(maxduration * percentage / 100)
    }
    volume(v) {// api function for volume (also cookies)
        if(typeof(v) != "undefined") {
            document.cookie = `volume=${v}; expires=Thu, 18 Dec 3000 12:00:00 UTC; path=/`
            console.log(`[videoplayer] changed volume to ${v}`)
            return this.video[0].volume = v
        } else {
            console.log(`[videoplayer] read volume (${getCookie("volume")}) from cookie`)
            return this.video[0].volume = getCookie("volume")
        }
    }
}

$(document).ready(() => {
    var continue_watching = new contwatch(recommended.getrecommended) /* still tmp */
    var menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay");
    player = new videoplayer(".videoplayer-container", vid, {"skipnxt": "continue_watching.parsed[0].href"})
    
    $(".menu-toggle").click(() => menu.toggle())

})
