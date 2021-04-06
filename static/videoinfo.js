ytapi = new class {
  constructor() {
    fetch("/static/apikeys.json").then(data => {
      return data.json();
    }).then((data) => {this.apis = data; console.log(data)})
  }
  async getplaylist(id) { // well gets an playlist thingy
    return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${this.apis.google}`)
      .then(data => data.json()).then(data => {
        if(data.nextPageToken) {
        return this.nextToken(data, "playlistItems?part=snippet&maxResults=50&playlistId="+id)
    }})

  }
  async nextToken(data, args) {
    let moretkn = data.nextPageToken
    let tkn     = [data]
    while(moretkn) {
      let d = tkn[tkn.length] = await fetch(`https://www.googleapis.com/youtube/v3/${args}&pageToken=${moretkn}&key=${this.apis.google}`).then(d => d.json())
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
}