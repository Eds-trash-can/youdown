var ytapi = new class {
  constructor() {
  this.apis = {}
    fetch("/api/yt").then(data => {
      return data.json();
    }).then((data) => {this.apis["yt"] = data["key"]})
  }
  async getplaylist(id) { // well gets an playlist thingy
    return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${this.apis.yt}`)
      .then(data => data.json()).then(data => {
        if(data.nextPageToken) {
        return this.nextToken(data, "playlistItems?part=snippet&maxResults=50&playlistId="+id)
    }})

  }
  async nextToken(data, args) {
    let moretkn = data.nextPageToken
    let tkn     = [data]
    while(moretkn) {
      let d = tkn[tkn.length] = await fetch(`https://www.googleapis.com/youtube/v3/${args}&pageToken=${moretkn}&key=${this.apis.yt}`).then(d => d.json())
      moretkn = d.nextPageToken
    }
    let tkn2 = {"pageInfo":tkn[0]["pageInfo"], "items":[]}
    for(let i = 0; i != tkn.length; i++) {
      let oo = []
      for(let o = 0; o != tkn[i].items.length; o++) {
      tkn2.items[tkn2.items.length] = tkn[i].items[o]
      }
    }
    return tkn2
  }
  async search(type, queue, count) {
  	if(!(["channel", "playlist", "video"].includes(type))) {
		return new Error("No type was specified! aborting")
  	}
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${this.apis.yt}&part=snippet&maxResults=${count}&q=${queue}&type=${type}`).then(data => {
      return data.json().then((data) => {
        return data.items
      })})
  }
  async channelInfo(id) {
    return fetch(`https://www.googleapis.com/youtube/v3/channels?key=${this.apis.yt}&part=snippet&id=${id}`).then(d => d.json()).then((d) => {
      return d.items[0]
    })
  }
  async getvideos(id) {
  	return fetch(`https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2CcontentDetails&fields=items(contentDetails%2FrelatedPlaylists%2Fuploads%2Csnippet%2Flocalized)&id=${id}&key=${this.apis.yt}`).then((data) => data.json()).then((data) => {
  		return data.items[0].contentDetails.relatedPlaylists.uploads
  	}).then((plid) => {
  		return this.getplaylist(plid)
  	})
  }
}