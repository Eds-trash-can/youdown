const recommended = new class {
    constructor() {
        this.api_entry = '/recom'
    }
    async getrecommended(i) {
        /* tmp i is count of videorecommendations*/
        /* fetch recomended video list array (ids => objects) */
        let rickroll = { "thumbnail": "/img/Adc-_e45.png", "title": "Rick Astley - Never Gonna Give You Up (Video)", "description": `Rick Astley's official music video for “Never Gonna Give You Up” 
        Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD​
        
        Subscribe to the official Rick Astley YouTube channel: https://RickAstley.lnk.to/subscribeYD​
        
        Follow Rick Astley:
        Facebook: https://RickAstley.lnk.to/followFI​
        Twitter: https://RickAstley.lnk.to/followTI​
        Instagram: https://RickAstley.lnk.to/followII​
        Website: https://RickAstley.lnk.to/followWI​
        Spotify: https://RickAstley.lnk.to/followSI​
        
        Lyrics:
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        
        #RickAstley​ #NeverGonnaGiveYouUp​ #DancePop`, "author": {"channelName": "Official Rick Astley", "channelID": "yt-UCuAXFkgsw1L7xaCfnd5JJOw", "platform": "Youtube"}, "release": "2009-10-25T00:00:00Z", "id":"yt-dQw4w9WgXcQ"};
        
        let re = []
        for(;i != 0; i--){
            re[re.length] = rickroll
        }
        return re
    }
}