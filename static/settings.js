$(document).ready(() => {
    console.log("Hi, this page is now starting the initialisation process!", )
    menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay", ".dark-startmenu-left", "",
    [{"type":"sentry","name":"Overview","link":"/settings/"},
    {"type":"topic","text":"content"},
    {"type":"sentry","name":"","link":"/last"},
    {"type":"sentry","name":"New","link":"/new"}]);
    $(".menu-toggle").click(() => menu.toggle())
})
