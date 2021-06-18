if(ytapi) {
	ytapi.gui = {}
	
	ytapi.gui.search = class {
		constructor(type, queue, count, div) {
			this.type  = type  // type of request ( channel / playlist / video )
							   //                   WIP       WIP        WIP
			this.queue = queue // search term used for searching   | yea very good explenation ik
			this.count = count // count of shown elements (max 50)
							   // planned features: load more entrys	

			// shared container object
			this.div  = $(div)
			this.name =   div

			// callbacks:
			this.callbacks = {"select":[]}

			ytapi.search("channel", queue, count).then((results) => this.addResults(results))
		}
		addResults(results) { // result is in format of youtube v3 api response (items part)
			// do some parsing stuff
			cc.log(results)
			for(let i = 0; i < results.length; i++ ) {
				this.div.append(
				`<div style="${this.styles.channelcontainer}">
				<div style="${this.styles.channelimagecontainer}">
					<img style="${this.styles.channelimage}" src="${results[i].snippet.thumbnails.default.url}">
				</div>
				<div style="${this.styles.channelname}">
					${results[i].snippet.channelTitle ? results[i].snippet.channelTitle : "NONE (sth is wrong i can feel it)"}
				</div>
				<div style="${this.styles.channeldesc}">
					${results[i].snippet.description ? results[i].snippet.description : "NONE"}
				</div>
				</div>`)
			}
		}
		on(action, callback) {
			if(!callback) {
				console.error("no callback specified")
				return new Error("no callback specified")
			}
			switch(action) {
				case "select":
					this.callbacks["select"][this.callbacks["select"].length] = callback
					return true
					break

				default:
					console.error("action argument not implemented or not present")
					return new Error("action argument not implemented or not present")
					break						
			}
		}
		get styles() {
			let r = {}

			r.channelcontainer = "height:6em;background-color:red;"

			r.channelimagecontainer = "position:relative;height:5em;width:5em;left:1em;top:1em;border-radius:50%;"

			r.channelimage = "height:100%;width:100%;border-radius:50%;background-color:green;border-width: 0;border-color:#ffffff00;"
			
			r.channelname = "position:relative;left:6em;top:-2.75em;font-weight:bold;font-size:1.25em;width:100000px;height:.4em"

			r.channeldesc = "position:relative;top:-3.65em;left:9em;font-size:12px;width:calc( 100% - 10em );"

			r.subscriber = ""

			return r
		}
	}
} else {
	console.error("Libary extension not applicable | ytapi not present\nor included after this extension")
}