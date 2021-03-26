async function retfunc(a) {
    return a
}
var channels = new class {
    get(channelid) {
        return $.get("/channel-api/"+channelid).then((data) => {
            data = JSON.parse(data);
            data["id"] = channelid;
            return data;
        })
    }
    fromjson(json) {
        json = JSON.parse(json);
        return new channel(json);
    }
    
}
class channel {
    name;
    contry;
    playlists;
    videos;
    icon;
    banner;
    platform;
    id;
    constructor(arr) {
        this.name = arr.name
        this.contry = arr.contry
        this.playlists = arr.playlists
        this.videos = arr.videos
        this.icon = arr.videos
        this.banner = arr.banner
        this.platform = arr.platform
        this.id = arr.id
    }
}