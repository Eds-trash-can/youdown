$(document).ready(() => {
    menu = new sidemenu(".dark-sidemenu-left-extended", ".dimm-overlay", ".dark-startmenu-left", "",
    [{"type":"sentry","name":"Overview","link":"/settings/"},{"type":"sentry","name":"","link":"/last"},{"type":"sentry","name":"","link":"/last"},{"type":"sentry","name":"New","link":"/new"}]);
    $(".menu-toggle").click(() => menu.toggle())
})
