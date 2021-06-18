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
				// like above create stuff in some lib
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
				popup = new ytapi.gui.search("channel", val[0], 10, ".popup")
				popup.div.css({"visibility":"visible"})
				popup.on("select", (channel) => {
					this.div.css({"visibility":"visible"})

					// getting videos to download:
					// get upload playlist of selected channel:
					/* W I P*/

					// get elements of playlist
					let videos = ytapi.getplaylist(playlist)
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