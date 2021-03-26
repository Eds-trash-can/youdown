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