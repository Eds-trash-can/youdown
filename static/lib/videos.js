const recommended = new class {
    constructor() {
        this.api_entry = '/recom'
    }
    async getrecommended(i) {
        /* tmp i is count of videorecommendations*/
        /* fetch recomended video list array (ids => objects) */
        let rickroll = { "thumbnail": "/img/Adc-_e45", "title": "Rick astley: Never gona let you down", "description": "Hi this is an placeholder! :>-", "src": "/video/Adc-_e45", "author": "ABCCWW" };
        let jessus = { "thumbnail": "/img/Adc-_e4a5", "title": "Wtf würde der jesus tun!?", "description": "JESUS older! :>-", "src": "/video/Adcs-_e45", "author": "ABCCWW" };
        let a2 = { "thumbnail": "/img/Adc-_e4a5", "title": "1Wtf würde der jesus tun!?", "description": "1JESUS older! :>-", "src": "/video/Adcs-_e45", "author": "ABCCWW" };
        return [rickroll, jessus, a2, a2, a2, a2, a2, a2, a2, a2]
    }
}