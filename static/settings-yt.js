$(document).ready(() => {
	$(".popup .closeX").on("click", ()=>{
		$(".popup").css({"visibility":"hidden"})
	})

    // generate the selectors:
    dl_type = new listchooser(".dl-type", [ // more or less depricated | no longer needet but looks good / actually does sth even if you could also just use the "" type and it auto-recognizes everything lul
        {"bcol":"#5b5b5b","val":"Channel-name"  ,"txt":"Channel (by name)" },
        {"bcol":"#5b5b5b","val":"Channel-id"    ,"txt":"Channel (by id)" },
        {"bcol":"#5b5b5b","val":"Playlist-name" ,"txt":"Playlist (by name)"},
        {"bcol":"#5b5b5b","val":"Playlist-id"   ,"txt":"Playlist (by id)"},
        {"bcol":"#5b5b5b","val":"Search"        ,"txt":"Search"  },
        {"bcol":"#5b5b5b","val":"Directly"      ,"txt":"Directly (by Video-ID)"}
    ], "#454545")
    dl_ids = new inputlist(".dl-id-list", {
        "bgcolor": "#454545",
        "submit_txt": "Download!",
    }, (val) => {
        // whatever parse stuff or sth
		// check type of download:
		switch(dl_type.value.toLowerCase()) {
			case "search":
				//for a video search (well well well then lets create another lib! sth like "/lib/ytapt-interface.js")
				alert("Haha not implemented yet\ngo die\nget rekt and call me\non\n1800-GETTING-REKT\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ni know what im writing is total dog poop")
				break;

			case "channel-name":
				if(!val[0]) {
					console.error("no channel name was given")
					alert("no channel name was given")
					return
				}
				if(dl_ids.length > 1) {
					for(let i = 1; i < dl_ids.length; i++ ) {
						console.warn("More than one channel-name was given (ignoring all but the first!)\nthis is not fatal")
					}
				}
				popup = new ytapi.gui.search("channel", val[0], 10, ".popup", placeholder)
				popup.div.css({"visibility":"visible"})

				// queue channel from user:
				popup.on("select", (search, channel) => {
					search.div.css({"visibility":"hidden"})
					cc.log(search)
					cc.log(channel)

					// get all videos of youtuber:
					ytapi.getvideos(channel).then((videos) => { // WIP
						cc.log(videos)	
						results = videos				
					})
					// getting videos to download:
					// get playlist of selected channel:
					/* W I P*/

				})
								
				//alert("WIP\ngo die or call:\n1800-AMAZON for help with your amaron ripe .pkg")

				break	
			
			case "channel-id":
				// for downloading form a channel
				//check if channel id is in correct format:
				if(!/^([a-zA-Z0-9\-\_]){24}$/.test(val))  {
					alert("pls choose type valid id (or u cant do that?!?!?!!?)?!?!?!?!?\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(get bent)\n\n\n\n\n\n\n(yes that was a danny reference)")
					break
				} else {
					alert("WIP")
				}
				break

			case "playlist-name":
				// cnt rly parse stuff here so

				
				alert("F U\nthis is a WI fucking P!")
				break

			case "playlist-id":
				// check is matching to playlist id
				if(!/^[a-zA-Z0-9-_]{34}$/.test(val))  {
					alert("pls choose type valid id (or u cant do that?!?!?!!?)?!?!?!?!?\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(get bent)\n\n\n\n\n\n\n(yes that was a danny reference)")
					break
				} else {
					alert("WIP")
				}
				
				break

			case "directly":
				//check if matching
				if(!/^[a-zA-Z0-9-_]{11}$/.test(val)) {
					alert("WRONG!")
				} else {
					alert("WWWWW\nIIIIII\nPPPPPPP\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n...")
				}
				break;

			default:
				//tell user he fucked up!
				alert("U did bad: u didnt supply a correct type for the download!\ngo die!\nalso ur pc has a\n\nVIRUS\n\ncall now for support:\n 1800-GET-REKT")
				// create multi interpreter (for direct urls / id-types)
				//...
				// i just realized that this makes the dl_type menu completely pointless.......
				// FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK
				// wellwellwell its going to look more good with more stuff to click on i quess
				// still half of the lib is now more or less worthless!!!!
				// god damn!
				// fckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfcfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckfckv u really read this all? or esrolled over here?! or just autowrap? if the latter then ... get rekt anyways
				break;
		}
    })
})























placeholder = [{"kind":"youtube#searchResult","etag":"XwZ2DaYlSa8QHz4V8uQgbIHekAY","id":{"kind":"youtube#channel","channelId":"UCXuqSBlHAE6Xw-yeJA0Tunw"},"snippet":{"publishedAt":"2008-11-25T00:46:52Z","channelId":"UCXuqSBlHAE6Xw-yeJA0Tunw","title":"Linus Tech Tips","description":"Tech can be complicated; we try to make it easy. Linus Tech Tips is a passionate team of \"professionally curious\" experts in consumer technology and video ...","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwniY8s1SAKzcuSpRCVQws9X4DY_btyihPC-BCFf7jw=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwniY8s1SAKzcuSpRCVQws9X4DY_btyihPC-BCFf7jw=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwniY8s1SAKzcuSpRCVQws9X4DY_btyihPC-BCFf7jw=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"Linus Tech Tips","liveBroadcastContent":"upcoming","publishTime":"2008-11-25T00:46:52Z"}},{"kind":"youtube#searchResult","etag":"wARusRxdmGITep3HIrzRZKlqs-0","id":{"kind":"youtube#channel","channelId":"UCo3H1qCzls08Zp-m2xuVoGg"},"snippet":{"publishedAt":"2017-05-04T20:13:03Z","channelId":"UCo3H1qCzls08Zp-m2xuVoGg","title":"LTT Rostock - Thermodynamik endlich verständlich","description":"Kanal des Lehrstuhls für Technische Thermodynamik der Fakultät für Maschinenbau und Schiffstechnik der Universität Rostock. Bei dem Video Projekt des ...","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhpoJXogt_DPK66FvrFBAd6OtP0SGzzM3CSnk_zXw=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhpoJXogt_DPK66FvrFBAd6OtP0SGzzM3CSnk_zXw=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhpoJXogt_DPK66FvrFBAd6OtP0SGzzM3CSnk_zXw=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LTT Rostock - Thermodynamik endlich verständlich","liveBroadcastContent":"upcoming","publishTime":"2017-05-04T20:13:03Z"}},{"kind":"youtube#searchResult","etag":"KmvrJq5TOco7ED8LDXoXW9_4H3M","id":{"kind":"youtube#channel","channelId":"UCEBxKea8z-2H6I5x7X342qQ"},"snippet":{"publishedAt":"2017-03-09T08:37:24Z","channelId":"UCEBxKea8z-2H6I5x7X342qQ","title":"LTT Nerf War","description":"LTT Nerf War : SQUAD Battle Crime Mask Boss and skills fight brought to you by LTT Films! In this Nerf war, Squad SWAT must use new Nerf guns to compete in ...","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwninFZMpjy-1LZ14k7ERz9pIH_5Ey6x7gnLZ19Q_=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwninFZMpjy-1LZ14k7ERz9pIH_5Ey6x7gnLZ19Q_=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwninFZMpjy-1LZ14k7ERz9pIH_5Ey6x7gnLZ19Q_=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LTT Nerf War","liveBroadcastContent":"none","publishTime":"2017-03-09T08:37:24Z"}},{"kind":"youtube#searchResult","etag":"B-trj-2-CzcGcLKc46WkFAid0rM","id":{"kind":"youtube#channel","channelId":"UCdBK94H6oZT2Q7l0-b0xmMg"},"snippet":{"publishedAt":"2020-01-24T01:20:03Z","channelId":"UCdBK94H6oZT2Q7l0-b0xmMg","title":"ShortCircuit","description":"What's in the box? Let's find out! Official channel under Linus Media Group.","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhltwsI1hcEUoo9jvBgXhT_fTrzOCHuH6NIGv2j=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhltwsI1hcEUoo9jvBgXhT_fTrzOCHuH6NIGv2j=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhltwsI1hcEUoo9jvBgXhT_fTrzOCHuH6NIGv2j=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"ShortCircuit","liveBroadcastContent":"none","publishTime":"2020-01-24T01:20:03Z"}},{"kind":"youtube#searchResult","etag":"h2TddhhVA9nUL4Ok3a7Jt4wPaRM","id":{"kind":"youtube#channel","channelId":"UCWnVjkV0APwGJGm5r6wkAKg"},"snippet":{"publishedAt":"2019-12-20T04:23:54Z","channelId":"UCWnVjkV0APwGJGm5r6wkAKg","title":"LTT Studio Germany","description":"Creativity Life Channel do great things for girls life with little time and money to beauty and happy ❤️ Please Subcrible Creativity Life Channel ...","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhVJHalpRfru8SUNnTPeVf6BvCzL2DU2_FgYxup=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhVJHalpRfru8SUNnTPeVf6BvCzL2DU2_FgYxup=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwnhVJHalpRfru8SUNnTPeVf6BvCzL2DU2_FgYxup=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LTT Studio Germany","liveBroadcastContent":"none","publishTime":"2019-12-20T04:23:54Z"}},{"kind":"youtube#searchResult","etag":"RovCe7rofgJQoVuYo_q6vzsVqlI","id":{"kind":"youtube#channel","channelId":"UCFcWodlssMUm3n7QIk7wf_g"},"snippet":{"publishedAt":"2017-05-25T07:56:20Z","channelId":"UCFcWodlssMUm3n7QIk7wf_g","title":"LTT Nerf Guns","description":"Hello, Welcome to the LTT Nerf guns Youtube channel. At this channel, we specialize in the production of action videos, fierce battles. The exciting action and ...","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwngntCnwXy6ZKiOLyhjni003tDOwXlxtVKNg6_VX=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwngntCnwXy6ZKiOLyhjni003tDOwXlxtVKNg6_VX=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwngntCnwXy6ZKiOLyhjni003tDOwXlxtVKNg6_VX=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LTT Nerf Guns","liveBroadcastContent":"upcoming","publishTime":"2017-05-25T07:56:20Z"}},{"kind":"youtube#searchResult","etag":"GgM4m0l34UB45jNFkaai5v8ZqqY","id":{"kind":"youtube#channel","channelId":"UCt2LlSUtlYybNZ9B4LZWGmQ"},"snippet":{"publishedAt":"2017-03-09T08:40:34Z","channelId":"UCt2LlSUtlYybNZ9B4LZWGmQ","title":"LTT Primitive Life","description":"We make this channel on the purpose of entertainment. This channel expresses the wild life when we get lost. We hope that all of you will feel happy with ...","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjjPIuk3liOQiSqUdT0AivRje1lHZz9Hk55KZiJ=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjjPIuk3liOQiSqUdT0AivRje1lHZz9Hk55KZiJ=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjjPIuk3liOQiSqUdT0AivRje1lHZz9Hk55KZiJ=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LTT Primitive Life","liveBroadcastContent":"none","publishTime":"2017-03-09T08:40:34Z"}},{"kind":"youtube#searchResult","etag":"JvhyT9D1fcSw4c3RngaBJYbKaiI","id":{"kind":"youtube#channel","channelId":"UC34f0dnh2IJv6Zk9gU2ZEMA"},"snippet":{"publishedAt":"2020-11-17T22:46:21Z","channelId":"UC34f0dnh2IJv6Zk9gU2ZEMA","title":"LTT Shop🇻🇳","description":"","thumbnails":{"default":{"url":"https://yt3.ggpht.com/nLxc1HAp3hFLrVuKkNLoDKqKRETc33QNbyHeGXGihVsNYFWJMStSBmhiSXRWtIlq_YsYyPj6Rw=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/nLxc1HAp3hFLrVuKkNLoDKqKRETc33QNbyHeGXGihVsNYFWJMStSBmhiSXRWtIlq_YsYyPj6Rw=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/nLxc1HAp3hFLrVuKkNLoDKqKRETc33QNbyHeGXGihVsNYFWJMStSBmhiSXRWtIlq_YsYyPj6Rw=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LTT Shop🇻🇳","liveBroadcastContent":"none","publishTime":"2020-11-17T22:46:21Z"}},{"kind":"youtube#searchResult","etag":"-8SylA0voi00WIuip9sXn4BkhZg","id":{"kind":"youtube#channel","channelId":"UCFLFc8Lpbwt4jPtY1_Ai5yA"},"snippet":{"publishedAt":"2019-09-21T00:15:00Z","channelId":"UCFLFc8Lpbwt4jPtY1_Ai5yA","title":"LMG Clips","description":"Official clips and highlights channel, owned and operated by the Linus Media Group team.","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjgtO_-FQ6HOnI3zXNjtd-AyNf_IoJnmpVP8CfW=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjgtO_-FQ6HOnI3zXNjtd-AyNf_IoJnmpVP8CfW=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjgtO_-FQ6HOnI3zXNjtd-AyNf_IoJnmpVP8CfW=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"LMG Clips","liveBroadcastContent":"none","publishTime":"2019-09-21T00:15:00Z"}},{"kind":"youtube#searchResult","etag":"rbAhWYPSqb4m-kdvj1PztkKgNqA","id":{"kind":"youtube#channel","channelId":"UCGl-WbQ98PT_Ke7gCL4F5Hg"},"snippet":{"publishedAt":"2016-10-02T10:03:50Z","channelId":"UCGl-WbQ98PT_Ke7gCL4F5Hg","title":"Trần Hợp LTT","description":"THCS Lương Tấn Thịnh - Đông Hòa - Phú Yên.","thumbnails":{"default":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjOPnpQINZ2OJgasucaWDo2zOWNWmcmKDBqM7jaeWc=s88-c-k-c0xffffffff-no-rj-mo"},"medium":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjOPnpQINZ2OJgasucaWDo2zOWNWmcmKDBqM7jaeWc=s240-c-k-c0xffffffff-no-rj-mo"},"high":{"url":"https://yt3.ggpht.com/ytc/AAUvwnjOPnpQINZ2OJgasucaWDo2zOWNWmcmKDBqM7jaeWc=s800-c-k-c0xffffffff-no-rj-mo"}},"channelTitle":"Trần Hợp LTT","liveBroadcastContent":"none","publishTime":"2016-10-02T10:03:50Z"}}]