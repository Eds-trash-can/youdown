

$(document).ready(() => {
   settingsmenu = new sidemenu(".settingsmenu", "settingsstartmenu", "",
    [{"type":"sentry","name":"Overview","link":"/settings/"},
    {"type":"topic","text":"content"},
    {"type":"sentry","name":"","link":"/last"},
    {"type":"sentry","name":"New","link":"/new"}], true);
    menu = new sidemenu(".sidemenu", ".dimm-overlay", "",
    [{"type":"space"},{"type":"entry","name":"Home","icon":"/static/home.svg","link":"/"},{"type":"entry","name":"Last","icon":"/static/last.svg","link":"/last"},{"type":"entry","name":"New","icon":"/static/clock.svg","link":"/new"}]);

    $(".menu-toggle").click(() => menu.toggle())
})
