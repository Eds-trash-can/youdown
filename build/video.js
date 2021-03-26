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
exports.get_video = exports.video = void 0;
var fs = __importStar(require("fs"));
var video = /** @class */ (function () {
    function video() {
    }
    return video;
}());
exports.video = video;
function get_video(req, res) {
    console.log("[" + req.ip + "] Got video info " + req.params.videoid);
    fs.readFile('./storadge/videos.json', function (err, data) {
        if (err) {
            console.log("lul an error accured reading some random file! (No i wont tell u which but de error)");
            console.log("Error: " + err);
            res.status(404);
            res.end("lul err!");
        }
        else {
            var str = data.toString();
            res.end(JSON.stringify(JSON.parse(str)[req.params.videoid]));
        }
    });
}
exports.get_video = get_video;
