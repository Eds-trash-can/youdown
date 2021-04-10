$(document).ready(() => {
    var continue_watching = new videolist(recommended.getrecommended) /* still tmp */
    menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay", "",
    [{"type":"entry","name":"Home","icon":"/static/home.svg","link":"/"},{"type":"entry","name":"Last","icon":"/static/last.svg","link":"/last"},{"type":"entry","name":"New","icon":"/static/clock.svg","link":"/new"}]);
player = new videoplayer(".videoplayer-container", vid, {"skipnxt": "continue_watching.parsed[0].href"})
    
    $(".menu-toggle").click(() => menu.toggle())
})
