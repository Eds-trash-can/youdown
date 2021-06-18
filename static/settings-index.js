$(document).ready(() => {
//statistics:
    st = {}
    st.videocount = new stat(".videocount",   "Videocount", 2000, {"url":"/stats-api/video/count"  ,"param":"videocount"},   "text")
    st.channelcnt = new stat(".channelcount", "Channels",  2000, {"url":"/stats-api/channel/count","param":"channelcount"}, "text")
})
