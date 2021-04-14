class stat {
    constructor(container, name, reqfreq, api, type) {
        this.container = container // container of html | $(x)
        this.name = name // name of statistic
        this.api  = api // api endpoint object
            //this.api.url   // url for json api
            //this.api.param // value of endpoint used as input
        this.type = type.toLowerCase() // type of statistic
            //available: text 
            //planned:   graph, diagramm; percentage
        if(reqfreq > 0) { // frequency of refreshes (ms) | false / 0 = no automatic refreshes
            this.reqfreq = reqfreq
        } else {
            this.reqfreq = false
        }
        this.autoupdateloop() // start automatic refeshing every ${this.reqfeq*1000} Seconds!
    }
    async autoupdateloop() { // autoupdate loop (dont call if u dont know what ur doing)
        this.update();
        setTimeout(() => {this.autoupdateloop()}, this.reqfreq);

    }
    async update() { // updates value
        // get data from api endpoint:
        let req = await fetch(this.api.url).then(d => d.json())
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
    st = {}
    st.videocount = new stat(".videocount", "Videocount", 2000, {"url":"/stats-api/videocount","param":"videocount"}, "text")

})