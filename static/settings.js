var dwd_extend = new class {
    constructor() {
        this.toggle(true)
        this.toggle()
        this.toggle()
    }
    toggle(i) {
        if(typeof this.status == "undefined") {
            this.status = !this.status
        } else {
            this.status = i
        }
        this.dostuff()
    }
    dostuff() {
        if(this.status) {
            $(".dwd").attr({"style":"visibility: visible"})
            $(".dwd-extend").html("/\\")
        } else {
            $(".dwd").attr({"style":"visibility: hidden"})
            $(".dwd-extend").html("\\/")
        }
    }

}

$(document).ready(() => {
   settingsmenu = new sidemenu(".settingsmenu", "settingsstartmenu", "",
    [{"type":"sentry","name":"Overview","link":"/settings/"},
    {"type":"topic","text":"CONTENT"},
    {"type":"sentry","name":"","link":"/last"},
    {"type":"sentry","name":"New","link":"/new"},    {"type":"topic","text":"GET FROM x <span class=\"dwd-extend clickable\">/\\</span>"},
    {"type":"sentry","name":"<span class=\"dwd\">New</span>","link":"/new"}
], true);
    menu = new sidemenu(".sidemenu", ".dimm-overlay", "",[
        {"type":"space"},
        {"type":"entry","name":"Home","icon":"/static/home.svg","link":"/"},
        {"type":"entry","name":"Last","icon":"/static/last.svg","link":"/last"},
        {"type":"entry","name":"New","icon":"/static/clock.svg","link":"/new"}
    ]);

    $(".menu-toggle").click(() => menu.toggle())
    $(".dwd-extend").click(() => dwd_extend.toggle())

    //statistics:
    st = {}
    st.videocount = new stat(".videocount",   "Videocount", 2000, {"url":"/stats-api/video/count"  ,"param":"videocount"},   "text")
    st.channelcnt = new stat(".channelcount", "Channels",  2000, {"url":"/stats-api/channel/count","param":"channelcount"}, "text")
})
