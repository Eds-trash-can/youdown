"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = void 0;
var fs = __importStar(require("fs"));
exports.video = new /** @class */ (function () {
    function class_1() {
        this.videodata = {};
        this.read();
    }
    class_1.prototype.read = function () {
        var _this = this;
        fs.readFile('./storadge/videos.json', function (err, data) {
            if (err) {
                console.log("[WARNING] COULD NOT READ INITIAL VIDEO-DATA");
                console.log("[WARNING] BREAKING");
                stop();
            }
            else {
                _this.videodata = JSON.parse(data.toString());
            }
        });
    };
    class_1.prototype.write = function () {
        fs.writeFile('./storadge/videos.json', JSON.stringify(this.videodata), function () {
            console.log("[META] wrote videos.json");
        });
    };
    class_1.prototype.statistics = function (req, res) {
        console.log("[" + req.ip + "] Got stats of " + req.params.stat);
        switch (req.params.stat) {
            case "count":
                res.end(JSON.stringify({ "videocount": Object.keys(this.videodata).length }));
                break;
        }
    };
    class_1.prototype.get = function (req, res) {
        console.log("[" + req.ip + "] Got video info " + req.params.videoid);
        var vid = this.videodata[req.params.videoid];
        res.end(JSON.stringify(vid));
    };
    class_1.prototype.stream = function (req, res) {
        var path = "./storadge/vid/" + req.params.file + ".mp4";
        fs.stat(path, function (err, stat) {
            // Handle file not found
            if (err !== null && err.code === 'ENOENT') {
                res.sendStatus(404);
            }
            else {
                var fileSize = stat.size;
                var range = req.headers.range;
                if (range) {
                    var parts = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(parts[0], 10);
                    var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    var chunksize = (end - start) + 1;
                    var file = fs.createReadStream(path, { start: start, end: end });
                    var head = {
                        'Content-Range': "bytes " + start + "-" + end + "/" + fileSize,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4',
                    };
                    res.writeHead(206, head);
                    file.pipe(res);
                }
                else {
                    var head = {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                    };
                    res.writeHead(200, head);
                    fs.createReadStream(path).pipe(res);
                }
            }
        });
    };
    ;
    return class_1;
}());
