class sidemenu {
    constructor(area, dimmarea, button, collapsed) { // if not collapsed (not implemented)
        this.area = area
        this.collapsed = collapsed
        this.state = false
        this.dimmarea = dimmarea
        this.animate(0)
        $(area).html(`<div class="menu-toggle-container">
        <img src="/static/menu-white.png" class="menu-toggle">
    </div>
    
    <div class="logo-container">
    <a href="/">
        <span class="logo">YouDown</span>
        </a>
    </div>
    <div style="top: 4em" class="extended-menu-entry">
    <a href="/">
        <div class="extended-menu-icon-container home-src">
            <img src="/static/home.svg" class="extended-menu-icon">
        </div>
        <div class="extended-menu-text-container home-src">
            <span class="extended-menu-text">Home</span>
        </div>
        </a>
    </div>
    
    <div style="top: 6em" class="extended-menu-entry">
    <a href="/new">
        <div class="extended-menu-icon-container">
            <img src="/static/clock.svg" class="extended-menu-icon">
        </div>
        <div class="extended-menu-text-container">
            <span class="extended-menu-text">Neu</span>
        </div>
        </a>
    </div>

    <div style="top: 8em" class="extended-menu-entry">
    <a href="/last">
        <div class="extended-menu-icon-container">
            <img src="/static/last.svg" class="extended-menu-icon">
        </div>
        <div class="extended-menu-text-container">
            <span class="extended-menu-text">Last</span>
        </div>
        </a>
    </div>
    <div style="top: 11em; left: 0.5em; width: calc(100% - 1em)" class="extended-menu-entry">
    <hr></hr>
    </div>`)
        /*if(collapsed) {
            $(collapsed).html(`Some entrys`)
        } // expand this if u rly want to */
    }
    set(i) {
        this.state = i; this.animate()
    }

    toggle() {
        this.state = this.state != true
        this.animate()
        this.dimm(this.state)
        return this.state
    }
    dimm(i) {
        if(!i) {
            $(this.dimmarea).attr("style", "height: 0%")
        } else {
            $(this.dimmarea).attr("style", "height: 100%")
            $(this.dimmarea).click(() => {this.state = false; this.animate()})
            console.log(`$("${this.dimmarea}").attr("style", "height: 100%")`)
        }
        return i
    }
    animate(a) {
        if(!a) {let a = 1000}
        if(this.state) {
            $(".dark-sidemenu-left-extended").animate({left: "0"}, a)
        } else {
            $(".dark-sidemenu-left-extended").animate({left: "-16em"}, a)
        }
        this.dimm(this.state)

    }
}
