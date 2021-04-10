class stat {
    constructor(container, name, reqfreq, api, type) {
        this.container = container // container of html | $(x)
        this.name = name // name of statistic
        this.api  = api // api endpoint object
            //this.api.url   // url for json api
            //this.api.param // value of endpoint used as input
        this.type = type // type of statistic
            //available: text 
            //planned:   graph, diagramm; percentage
        if(reqfreq > 0) { // frequency of refreshes | false / 0 = no automatic refreshes
            this.reqfreq = reqfreq

        } else {
            this.reqfreq = false
        }
        this.update()
    }
    async autoupdateloop() { // autoupdate loop (dont call if u dont know what ur doing)
        this.update
        setTimeout(this.autoupdateloop(), this.reqfreq)

    }
    async update() { // updates value
        // get data from api endpoint:
        let req = await fetch(api.url).then(d => d.json())
        let html = "";
        switch(this.type) {
            case "text": 
            html += `<span class="stat-text">`;
            html += `${this.name}: ${req[this.api.param]}`;
            html += `</span>`;
            break;
        }
        // set actual value
        $(this.container).html(html);

    }
}

$(document).ready(() => {
    console.log("Hi, this page is now starting the initialisation process!", )
    menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay", ".dark-startmenu-left", "",
    [{"type":"sentry","name":"Overview","link":"/settings/"},
    {"type":"topic","text":"content"},
    {"type":"sentry","name":"","link":"/last"},
    {"type":"sentry","name":"New","link":"/new"}], true);
    $(".menu-toggle").click(() => menu.toggle())
})
