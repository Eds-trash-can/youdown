import * as fs from "fs";

export class channel {}
export function get_channel( req: any, res: any ):void { /* Its complaining with any defined (even :request etc.) so lol fufk lülzkys*/
    console.log(`[${req.ip}] Got channel ${req.params.channel}`);
    fs.readFile('./storadge/channels.json', (err, data) => {
        if(err) {
            console.log(`lul an error accured reading some random file! (No i wont tell u which but de error)`);
            console.log(`Error: ${err}`);
            res.status(404);
            res.end("lul err!");
        } else {
            let str = data.toString()
            res.end(JSON.stringify(JSON.parse(str)[req.params.channel]))
        }
    })
}