class sidemenu {
    constructor(area, dimmarea, button, collapsed, content) { // if not collapsed (not implemented)
        this.area = area
        this.collapsed = collapsed
        this.state = false
        this.dimmarea = dimmarea
        this.animate(0)
        let html = `<div class="menu-toggle-container">
        <img src="/static/menu-white.png" class="menu-toggle">
    </div>
    
    <div class="logo-container">
    <a href="/">
        <span class="logo">YouDown</span>
        </a>
    </div>`
        let top = 4
        for(let i = 0; i < content.length; i++) {
            switch(content[i].type) {
                case "entry":
                    html += `<div style="top: ${top}em" class="extended-menu-entry">
                <a href="${content[i].link}">
                    <div class="extended-menu-icon-container">
                        <img src="${content[i].icon}" class="extended-menu-icon">
                    </div>
                    <div class="extended-menu-text-container">
                        <span class="extended-menu-text">${content[i].name}</span>
                    </div>
                    </a>
                    </div>`
                    top += 2
                    break;

                case "seperator": 
                    html += `<div style="top: ${top+3}em; left: 0.5em; width: calc(100% - 1em)" class="extended-menu-entry">
                    <hr></hr>`
                    top += 5
                    break;
                
                case "sentry": 
                    html += `<a href="${content[i].link}">
                    <div style="top: ${top}em" class="smenu-entry">
                    
                        <div class="smenu-text-container">
                            <span class="smenu-text">${content[i].name}</span>
                        </div>
                    </div>
                    </a>`
                    top += 3
                    break;
                
            }
            html += "</div>"
        $(area).html(html)
        }
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
