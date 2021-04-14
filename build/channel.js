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
exports.channel = void 0;
var fs = __importStar(require("fs"));
exports.channel = new /** @class */ (function () {
    function class_1() {
        this.channeldata = {};
        this.read();
    }
    class_1.prototype.read = function () {
        var _this = this;
        fs.readFile('./storadge/channels.json', function (err, data) {
            if (err) {
                console.log("[WARNING] COULD NOT READ INITIAL CHANNEL-DATA");
                console.log("[WARNING] BREAKING");
                stop();
            }
            else {
                _this.channeldata = JSON.parse(data.toString());
            }
        });
    };
    class_1.prototype.write = function () {
        fs.writeFile('./storadge/channels.json', JSON.stringify(this.channeldata), function () {
            console.log("[META] wrote channels.json");
        });
    };
    class_1.prototype.get = function (req, res) {
        console.log("[" + req.ip + "] Got channel " + req.params.channel);
        if (this.channeldata[req.params.channel]) {
            var d = this.channeldata[req.params.channel].toString();
            res.end(JSON.stringify(d[req.params.channel]));
        }
        else {
            res.status(404);
            res.end(JSON.stringify({ "err": "channelnotfound" }));
        }
    };
    class_1.prototype.statistics = function (req, res) {
        console.log("[" + req.ip + "] Got channel-stats of " + req.params.stat);
        switch (req.params.stat) {
            case "count":
                res.send(JSON.stringify({ "channelcount": Object.keys(this.channeldata).length }));
                break;
        }
        res.end("");
    };
    return class_1;
}());
