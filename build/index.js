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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var channel_1 = require("./channel");
var video_1 = require("./video");
//import { user } from 'users';
var app = express_1.default();
var PORT = 8080;
app.get('/', function (req, res) {
    fs.readFile('./static/index.html', function (err, data) {
        if (err) {
            res.status(404);
            res.end("<p>Lol error:</p>" + err);
        }
        else {
            res.end(data);
        }
    });
});
app.get('/settings', function (req, res) {
    fs.readFile('./static/settings/index.html', function (err, data) {
        if (err) {
            res.status(404);
            res.end("<p>Lol error:</p>" + err);
        }
        else {
            res.end(data);
        }
    });
});
app.get('/settings/:file', function (req, res) {
    fs.readFile('./static/settings/' + req.params.file + ".html", function (err, data) {
        if (err) {
            res.status(404);
            res.send('settings-page not found!');
        }
        else {
            res.contentType(req.params.file + ".html");
            res.send(data);
        }
        res.end();
    });
});
app.get('/static/:file', function (req, res) {
    fs.readFile('./static/' + req.params.file, function (err, data) {
        if (err) {
            res.status(404);
            res.send('Y u here?');
        }
        else {
            res.contentType(req.params.file);
            res.send(data);
        }
        res.end();
    });
});
app.get('/watch/:video', function (req, res) {
    fs.readFile('./static/watch.html', function (err, data) {
        res.contentType("html");
        if (err) {
            res.status(404);
            res.send('lul files missing :( (error on console)');
            console.log("[" + req.ip + "|0/1] /watch failed to read static file. err:'" + err + "'");
            console.log("[" + req.ip + "|1/1] /watch " + req.params.video);
        }
        else {
            res.contentType("html");
            res.send(data + "<script>\nconst vid = \"" + req.params.video + "\"\n</script>");
        }
        res.end();
    });
});
app.get('/channel-api/:channel', function (req, res) { channel_1.get_channel(req, res); });
app.get('/video-api/:videoid', function (req, res) { video_1.get_video(req, res); });
app.get('/stats-api/:stat', function (req, res) { video_1.video_statistics(req, res); });
app.get('/img/:file', function (req, res) {
    console.log("[" + req.ip + "|0/0] img at: ./storadge/img/" + req.params.file);
    fs.readFile("./storadge/img/" + req.params.file, function (err, data) {
        if (err) {
            res.status(404);
            fs.readFile('./static/404.jpeg', function (err, data) {
                if (err) {
                    res.end("lul error in error .^. (" + err + ")");
                }
                else {
                    res.contentType("jpeg");
                    res.end(data);
                }
            });
        }
        else {
            res.contentType("png");
            res.send(data);
            res.end();
        }
    });
});
app.get('/vid/:file', function (req, res) {
    fs.readFile("./storadge/vid/" + req.params.file + ".mp4", function (err, data) {
        if (err) {
            res.status(404);
            res.send('Y u here?');
        }
        else {
            res.contentType("mp4");
            res.send(data);
        }
        res.end();
    });
});
app.get('/lib/:file', function (req, res) {
    fs.readFile('./static/lib/' + req.params.file, function (err, data) {
        if (err) {
            res.status(404);
            res.send('Y u here?');
        }
        else {
            res.contentType(req.params.file);
            res.send(data);
            console.log("[" + req.ip + "|0/0] Reading file: " + req.params.file);
        }
        res.end();
    });
});
app.listen(PORT, function () {
    console.log("[SERVER]: running at http://localhost:" + PORT);
});
