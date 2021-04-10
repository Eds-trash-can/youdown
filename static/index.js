class recomen {
    videos
    constructor(v) {
        this.videos = v
    }
    get html() {
        let w = $(window).width();
        let vpr = 0
        switch (true) {
            case (w > 1070): /* 4 vids */
                vpr++;
            case (w > 1200):/* 3 vids */
                vpr++;
            case (w > 930): /* 2 vids */
                vpr++;

            default:
                vpr++;
                break;
        }

        let html;
        let index = 0;

        html = `<div class="recomendations-container">\n<div class="video-row">`;
        for (let x = 2; x != 0; x--) {
            for (let y = vpr; y != 0; y--) {
                //let icon, chinfo
                const icon = `rnd-${Math.floor(Math.random()*10000)}`
                const chinfo = `rnd-${Math.floor(Math.random()*10000)}`
                html += `<a href="/watch/${this.videos[index].id}">
                <div class="video-container clickable" style="backgound-color: green; top: ${(x-1)*22}em; left: ${(y-1)*23}em">
                <div class="thumbnail-container">
                    <img class="thumbnail-picture" src="${this.videos[index].thumbnail}">
                </div>

                <div class="video-info">
                    <div class="video-info-channel-icon-container">
                    <a href="/channels/${this.videos[index].author.channelID}">
                        <img class="video-info-channel-icon clickable" id="${icon}" src="">
                        </a>
                    </div>
                    <div class="video-info-title-container">
                        <span class="video-info-title">${this.videos[index].title}</span>
                    </div>
                    <div class="video-info-channel-container">
                    <a href="/channels/${this.videos[index].author.channelID}" style="text-decoration: none;">
                        <span class="video-info-channel clickable">${this.videos[index].author.channelName} @${this.videos[index].author.platform}</span>
                    </a>
                        </div>
                </div>
            </div>`;
                const ch = channels.get(this.videos[index].author.channelID);
                ch.then((a) => {$(`#${icon}`  ).attr("src", a.icon)})

                index++;
            };
        };
        html += `</div>\n</div>\n`;
        return html
    }
}
console.log(`Hi to this console youre going to see a ton of errors around here! (or at leas warnings!) ;)`)

$(document).ready(() => {
    recommended.getrecommended(8).then((a) => {
        recommendation = new recomen(a)
        $(".main-area-container").html(recommendation.html)
    }) /* still tmp */
    menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay", "",
    [{"type":"space"},{"type":"entry","name":"Home","icon":"/static/home.svg","link":"/"},{"type":"entry","name":"Last","icon":"/static/last.svg","link":"/last"},{"type":"entry","name":"New","icon":"/static/clock.svg","link":"/new"}]);

    $(".menu-toggle").click(() => menu.toggle())

})
