var sidebar = document.getElementById("sidebar");
var videoContainer = document.getElementById("video-container");
var canvas = document.getElementById("main");
var stage = new createjs.Stage("main");
var distanceUnits = {
    "fullUnits": ["meter (m)", "inch (in)", "foot (ft)", "yard (yd)", "mile (mi)", "link (li)", "rod (rd)", "chain (ch)", "angstrom", "mil"],
    "abbreviations": ["m", "in", "ft", "yd", "mi", "li", "rd", "ch", "angstrom", "mil"],
    "unitNames": ["meter", "inch", "foot", "yard", "mile", "link", "rod", "chain", "angstrom", "mil"],
    "wordPrefixBig": ["deca", "hecto", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"],
    "abbrPrefixBig": ["da", "h", "k", "M", "G", "T", "P", "E", "Z", "Y"],
    "wordPrefixSmall": ["deci", "centi", "milli", "micro", "nano", "pico", "femto", "atto", "zepto", "yocto"],
    "abbrPrefixSmall": ["d", "c", "m", "u", "n", "p", "f", "a", "z", "y"]
};
const EXPORT_FORMATS = ["xlsx", "xlsm", "xlsb", "xls", "ods", "fods", "csv", "txt", "sylk", "html", "dif", "dbf", "rtf", "prn", "eth"];
const CUSTOM_EXTENSION = "jstrack";
const VIDEO_CONVERTOR = "https://video.online-convert.com/convert-to-mp4";
const GOOGLE_API_KEY = 'AIzaSyBNvbE95WObsTDKxj8Eo7x2jfCmP99oxNA';
const GOOGLE_CLIENT_ID = '44440188363-5vnafandpsrppr9189u7sc8q755oar9d';

var background = new createjs.Bitmap(document.getElementById("video"));
var background2 = new createjs.Bitmap(document.getElementById("video-clone"));
stage.addChild(background2);
stage.addChild(background);

var tableContainer = document.getElementById('table');
var master = new Project("My Project", new Timeline(canvas.width, canvas.height, document.getElementById("video"), 30), new Handsontable(tableContainer), stage, background);


master.timeline.video.addEventListener("loadstart", function(){
    document.getElementById("video-clone").src = this.src;
    document.getElementById("video-clone").pause();
    document.getElementById("video-clone").style.display = "none";
});

tableContainer.querySelectorAll("table").forEach(function(el){
    el.id = "data-table-master";
});

var video = master.timeline.video;

var posTextBackground = new createjs.Shape();
var posTextBackgroundCommand = posTextBackground.graphics.beginFill("#000000").drawRect(0, 0, 200, 30).command;
var posText = new createjs.Text("Frame: 0, X: 0, Y: 0", "13px Arial", "#FFF");
posText.x = 10;
posText.y = canvas.height - 15;
stage.addChild(posTextBackground);
stage.addChild(posText);

stage.enableMouseOver();

createjs.Ticker.addEventListener("tick", stage);
stage.addEventListener("tick", function(){
    if(master.created)
        master.timeline.update();
});