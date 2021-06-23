class stat { //hi
    constructor(container, name, reqfreq, api, type, styles) {
        this.container = container // container of html | $(x)
        this.name = name // name of statistic
        this.api  = api // api endpoint object
        this.type = type.toLowerCase() // type of statistic
            //available: text, img
            // WIP: graph
            //planned:   diagramm; percentage

			// text:
			//container     // container containing stuff
			//name			// name displayed in stat
			//reqfreq		// frequency at witch api is queued
			//api.url		// endpoint of api
			//api.param		// parameter witch ur api responds width
			//type			// should be "text" if u want to display text
			//styles		 // ignored
			            

			// img:
			//container     // container containing stuff
			//name			// ignored
			//reqfreq		// frequency at witch its refreshed
            //api.url       // url for api
            //api.timestamp // to avoid caching issues a timestamp (in millis) is send with the image request (defualt: "_")
            //type			// should be "img" if u want to display a image
	        //styles.height // height of picture (auto by default)
	        //styles.width  // width of picture (auto by default)

	        this.styles = styles ? styles : {}
	        


        if(reqfreq > 1) { // frequency of refreshes (ms) | false / 0 = no automatic refreshes
            this.reqfreq = reqfreq
   		    this.autoupdateloop() // start automatic refeshing every ${this.reqfeq*1000} Seconds!
        } else {
            this.reqfreq = false
            this.update()         // just initialize once
        }
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
	            html += `${this.name}: ${req[this.api.param]}`;
	            break;

	        case "img":
	        	html += `<img style="height:${this.styles.height ? this.styles.height : "auto"};width:${this.styles.width ? this.styles.width : "auto"}" src="${req[this.api.endpoint]}?${this.api.timestamp ? this.api.timestamp : "_"}=${new Date().getTime()}">`

			case "graph":
				html += `<canvas style="height:${this.styles.height ? this.styles.height : "auto"};width:${this.styles.width ? this.styles.width : "auto"}">ur browser sucks pls update to sth at least half decent (even IE would work)</canvas>`
        }
        // set actual value
        $(this.container).html(html);
        return req[this.api.param];
    }
}