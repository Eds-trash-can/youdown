import * as fs from "fs";

export var secure = new class {
    apis: any;
    constructor() {
        this.apis = {};
        this.read("API");
    }
    read(t: string) {
    switch(t) {
    	case "API":
	        fs.readFile('./api-keys.json', (err, data) => {
	            if (err) {
	                console.log("[WARNING] COULD NOT READ API KEYS");
	                console.log("[WARNING] BREAKING");
					while(true) {}
	            } else {
	                this.apis = JSON.parse(data.toString());
	            }
	        })
	        return 1;
	        break;

	    default:
	    	return 0;
	    	break
	    }
    }
    apiMGR(req: any, res: any): void {
        console.log(`[${req.ip}] Got api ${req.params.api}`);
        //whitelist:
        if(["yt"].includes(req.params.api)) {
        	res.end(JSON.stringify({"key":this.apis[req.params.api]}));
        } else {
        	res.statusCode = 404;
        	res.end("API not found");
        }
    }
 }