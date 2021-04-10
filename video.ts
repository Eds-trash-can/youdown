import * as fs from "fs";

export class video {}
export function get_video(req: any, res: any):void {
    console.log(`[${req.ip}] Got video info ${req.params.videoid}`);

    fs.readFile('./storadge/videos.json', (err, data) => {
        if(err) {
            console.log(`lul an error accured reading some random file! (No i wont tell u which but de error)`);
            console.log(`Error: ${err}`);
            res.status(404);
            res.end("lul err!");
        } else {
            let str = data.toString()
            res.end(JSON.stringify(JSON.parse(str)[req.params.videoid]))
        }
    })
}

export function video_stream(req: any, res:any) {
    let path = "./storadge/vid/"+req.params.file+".mp4"
    fs.stat(path, (err, stat) => { //thx for the example i basically just copied it :))) https://webomnizz.com/video-stream-example-with-nodejs-and-html5/

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }
    
        const fileSize = stat.size
        const range = req.headers.range
    
        if (range) {
    
            const parts = range.replace(/bytes=/, "").split("-");
    
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            
            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
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
    })
};

export function video_statistics(req: any, res: any):void {
    console.log(`[${req.ip}] Got stats of ${req.params.stat}`)
    fs.readFile('./storadge/videos.json', (err, data) => {
        if(err) {
            res.status(404);
        } else {
            let str = data.toString()
            switch(req.params.stat) {
                case "videocount":
                    res.end(JSON.stringify({"videocount":Object.keys(JSON.parse(str)).length}))
                    break;
            }
        }
    })
}