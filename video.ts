import * as fs from "fs";

export var video = new class {
    videodata: any;
    constructor() {
        this.videodata = {}
        this.read()
    }
    read() {
        fs.readFile('./storadge/videos.json', (err, data) => {
            if (err) {
                console.log("[WARNING] COULD NOT READ INITIAL VIDEO-DATA")
                console.log("[WARNING] BREAKING")
                stop();
            } else {
                this.videodata = JSON.parse(data.toString())
            }
        })
    }
    write() {
        fs.writeFile('./storadge/videos.json', JSON.stringify(this.videodata), () => {
            console.log("[META] wrote videos.json")
        })
    }
    statistics(req: any, res: any): void {
        console.log(`[${req.ip}] Got stats of ${req.params.stat}`)
        switch (req.params.stat) {
            case "count":
                res.end(JSON.stringify({ "videocount": Object.keys(this.videodata).length }))
                break;
        }
    }
    get(req: any, res: any): void {
        console.log(`[${req.ip}] Got video info ${req.params.videoid}`);
        let vid = this.videodata[req.params.videoid]
        res.end(JSON.stringify(vid))
    }
    stream(req: any, res: any) {
        let path = "./storadge/vid/" + req.params.file + ".mp4"
        fs.stat(path, (err, stat) => { //thx for the example i basically just copied it :))) https://webomnizz.com/video-stream-example-with-nodejs-and-html5/
    
            // Handle file not found
            if (err !== null && err.code === 'ENOENT') {
                res.sendStatus(404);
            } else {
    
                const fileSize = stat.size
                const range = req.headers.range
    
                if (range) {
    
                    const parts = range.replace(/bytes=/, "").split("-");
    
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
                    const chunksize = (end - start) + 1;
                    const file = fs.createReadStream(path, { start, end });
                    const head = {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4',
                    }
    
                    res.writeHead(206, head);
                    file.pipe(res);
                } else {
                    const head = {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                    }
    
                    res.writeHead(200, head);
                    fs.createReadStream(path).pipe(res);
                }
            }
        })
    };
}