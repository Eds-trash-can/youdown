import * as fs from "fs";

export class video {}
export function get_video(req: any, res: any):void {
    console.log(`[${req.ip}] Got video info ${req.params.videoid}`);
    fs.readFile('./storadge/videos.json', (err, data) => {
        if(err) {
            res.status(404);
        } else {
            let str = data.toString()
            res.end(JSON.stringify(JSON.parse(str)[req.params.videoid]))
        }
    })
}
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