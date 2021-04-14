import * as fs from "fs";

export var channel = new class { 
    channeldata: any;
    constructor() {
        this.channeldata = {}
        this.read()
    }
    read() {
        fs.readFile('./storadge/channels.json', (err, data) => {
            if(err) {
                console.log("[WARNING] COULD NOT READ INITIAL CHANNEL-DATA")
                console.log("[WARNING] BREAKING")
                stop();
            } else {
                this.channeldata = JSON.parse(data.toString())
            }
        })
    }
    write() {
        fs.writeFile('./storadge/channels.json', JSON.stringify(this.channeldata), () => {
            console.log("[META] wrote channels.json")
        })
    }
    get(req: any, res: any): void { /* Its complaining with any defined (even :request etc.) so lol fufk lülzkys*/
        console.log(`[${req.ip}] Got channel ${req.params.channel}`);
        if(this.channeldata[req.params.channel]) {
            let d = this.channeldata[req.params.channel].toString()
            res.end(JSON.stringify(d[req.params.channel]))
        } else {
            res.status(404)
            res.end(JSON.stringify({"err":"channelnotfound"}))
        }
    }

    statistics(req: any, res: any) {
        console.log(`[${req.ip}] Got channel-stats of ${req.params.stat}`)
        switch(req.params.stat) {
            case "count":
                res.send(JSON.stringify({"channelcount": Object.keys(this.channeldata).length}))
                break;
        }
        res.end("")
    }
}
