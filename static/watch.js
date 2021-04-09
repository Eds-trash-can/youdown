$(document).ready(() => {
    var continue_watching = new videolist(recommended.getrecommended) /* still tmp */
    var menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay");
    player = new videoplayer(".videoplayer-container", vid, {"skipnxt": "continue_watching.parsed[0].href"})
    
    $(".menu-toggle").click(() => menu.toggle())
})
