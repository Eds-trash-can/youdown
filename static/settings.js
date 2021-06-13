var dwd_extend = new extendmenu() //pls fix im to lazy...

$(document).ready(() => {
   settingsmenu = new sidemenu(".settingsmenu", "settingsstartmenu", "",
    [{"type":"sentry",    "name":"Overview", "link":"/settings/"},
    {"type":"topic",      "text":"CONTENT"}, 
    {"type":"sentry",     "name":"General",  "link":"/last"},
    {"type":"sentry",     "name":"New",      "link":"/new"},    
    {"type":"topic",      "text":"ADD FROM x <span class=\"dwd-extend clickable\">/\\</span>"},
    {"type":"collapsable","name":"Files",    "link":"/settings/files"},
    {"type":"collapsable","name":"YouTube",  "link":"/settings/yt"}
], true);
    menu = new sidemenu(".sidemenu", ".dimm-overlay", "",[
        {"type":"space"},
        {"type":"entry","name":"Home","icon":"/static/home.svg","link":"/"},
        {"type":"entry","name":"Last","icon":"/static/last.svg","link":"/last"},
        {"type":"entry","name":"New","icon":"/static/clock.svg","link":"/new"}
    ]);

    $(".menu-toggle").click(() => menu.toggle())
    $(".dwd-extend").click(() => dwd_extend.toggle())

})
