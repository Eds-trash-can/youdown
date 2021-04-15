class sidemenu {
    constructor(area, dimmarea, collapsed, content, defaultstate) { // if not collapsed (not implemented)
        this.area = area           // area of sidemenu
        this.collapsed = collapsed // does nth; planned for future
        this.dimmarea = dimmarea   // div to be streatched over screen
        if(defaultstate) {         // if defaultstate is open => disables dimming
            this.state = true
            this.dimmarea = ""
        } else {
            this.state = false
        }
        this.animate(0) // applys state change

        // parse menu entrys to html
        let html = `<div class="menu-toggle-container">
        <img src="/static/menu-white.png" class="menu-toggle">
    </div>
    
    <div class="logo-container">
    <a href="/">
        <span class="logo">YouDown</span>
        </a>
    </div>`
        let top = 3
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
                
                case "topic":
                    html += `<div style="top: ${top}em" class="text-entry">
                        <div class="text-entry-container">
                            <span class="text-entry-text">${content[i].text}</span>
                        </div>
                    </div>`
                    top += 3   
                break;

                case "space":
                    top ++;
                break;

                case "raw":
                    html += content[i].html
                    top +=  content[i].height
            }
            html += "</div>"
        $(area).html(html)
        }
        /*if(collapsed) {
            $(collapsed).html(`Some entrys`)
        } // expand this if u rly want to */
    }
    set(i) { // sets state of sidemenu
        this.state = i; this.animate()
    }

    toggle() { // toggles sidemenu
        this.state = this.state != true
        this.animate()
        this.dimm(this.state)
        return this.state
    }
    dimm(i) { // just dimms without affecting the state of the menu (dosnt work if defaultstate is true)
        if(!i) {
            $(this.dimmarea).attr("style", "height: 0%")
        } else {
            $(this.dimmarea).attr("style", "height: 100%")
            $(this.dimmarea).click(() => {this.state = false; this.animate()})
        }
        return i
    }
    animate(a) { // animates the sidemenu; a is the animationtime in ms defualt: 1000
    if(!a) {let a = 1000}
        if(this.state) {
            $(this.area).animate({left: "0"}, a)
        } else {
            $(this.area).animate({left: "-16em"}, a)
        }
        this.dimm(this.state)

    }
}
