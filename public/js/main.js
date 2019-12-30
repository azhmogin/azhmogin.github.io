var hue = null;

function updateStyle() {
    getHue();
    const sheet = new CSSStyleSheet();
    const backColor = `hsl(${hue},40%,30%)`;
    const linkColor = `hsl(${hue},70%,30%)`;
    var theme = '.theme-rolling .sidebar {background-color: ' + backColor + ';}\n';
    theme += '.theme-rolling .content a, .theme-rolling .related-posts li a:hover {color: ' + linkColor + ';}';
    sheet.replaceSync(theme);
    document.adoptedStyleSheets = [sheet];
}

function updateColor() {}

function randomizeHue() {
    hue = Math.floor(Math.random() * 360);
    updateHue();
    resetColor();
}

function getHue() {
    if (hue == null) {
	hue = window.sessionStorage.getItem("page-hue");
	if (hue == null) {
	    hue = Math.floor(Math.random() * 360);
	    updateHue();
	} else {
	    hue = parseInt(hue, 10);
	}
    }
}

function updateHue() {
    window.sessionStorage.setItem("page-hue", hue);
}

function updateClassBackgroundColor(class_name, color) {
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++) { all[i].style.backgroundColor = color; }
}

function updateTagClassColor(tag, class_name, color) {
    var elements = document.getElementsByClassName(class_name);
    for (var i = 0; i < elements.length; i++) {
	var links = elements[i].getElementsByTagName(tag);
	for (var j = 0; j < links.length; j++) {
	    links[j].style.color = color;
	}
    }
}

function resetColor() {
    const backColor = `hsl(${hue},40%,30%)`;
    const linkColor = `hsl(${hue},70%,30%)`;
    updateClassBackgroundColor('sidebar', backColor);
    updateTagClassColor('a', 'content', linkColor);
}

updateStyle();
