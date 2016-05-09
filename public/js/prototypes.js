/////////////////////////////////////////////////////////////////////////////
//  Prototype Functions
/////////////////////////////////////////////////////////////////////////////
String.prototype.rgb2hex = function(rgb) {
    if (!rgb) rgb = this.toString();
    var r, g, b;

    rgb = rgb.replace('rgb', '')
        .replace('(', '')
        .replace(')', '')
        .split(',')
        .map(function(e) {
            return parseInt(e, 10);
        });

    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

String.prototype.hex2rgb = function(hex) {
    if (!hex) hex = this.toString();
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    var sp = ",";

    return "rgb(" + rgb.r + sp + rgb.g + sp + rgb.b + ")";
}

String.prototype.getRgba = function(alpha) {
    if (!alpha) alpha = 1;
    var err, rgba, thisColor = this.toString();

    try {
        if (thisColor.lastIndexOf('#') < 0 && thisColor.lastIndexOf('rgb' >= 0)) type = 'rgb';
        if (thisColor.lastIndexOf('#') >= 0 && thisColor.length === 7) type = 'hex';
        else throw new Error('Hex Code Must Have 6 Digits');
    }
    catch (e) {
        thisColor += thisColor.replace('#', '');
        err = e;
        err.attempt = "Tried to convert 3digit hex to 6 digit hex";
    } finally {
        if (thisColor.lastIndexOf('#') >=0 && thisColor.length === 7) type = 'hex';
        else type = undefined;
        if (type == undefined) return {err: err, arguments: [thisColor, alpha]};
    }

    if (type === 'hex') rgba = thisColor.hex2rgb().replace(')', ',' + alpha + ')');

    return rgba;
}

String.prototype.color = function(type, alpha) {
    switch (type) {
        case 'rgb':
            // console.log("RGB", this.toString())
            if (this.toString().lastIndexOf('#') > -1) return this.toString().hex2rgb();
            else return this.toString();
        case 'hex':
            // console.log("HEX", this.toString())
            if (this.toString().lastIndexOf('rgb') > -1) return this.toString().rgb2hex();
            else return this.toString();
        case 'rgba':
            console.log("HEX", this.toString())
            if (this.toString().lastIndexOf('rgb') > -1) return this.toString().getRgba(alpha);
            else if (this.toString().lastIndexOf('#') >= 0) return this.toString().getRgba(alpha);
        default:
            // console.log("Default", this.toString())
            return this.toString();
    }
}

String.prototype.px = function(operation, value) {
    var px = this.toString();
    if (!operation) return px;
    if (!value) return px;
    // Get Num
    px = parseInt(this.toString(), 10);
    // Determine operation
    switch (operation) {
        case 'add':
            // Add Px
            return px + value + "px";
        case 'sub':
            // Add Px
            return px - value + "px";
        case 'prod':
            // Add Px
            return px * value + "px";
        case 'fact':
            // Add Px
            return px / value + "px";
    }

}

Number.prototype.round = function(p) {
    p = p || 10;
    return parseFloat(this.toFixed(p));
};

Array.prototype.getPriceTotals = function(array) {
    if (!array) array = this;
    var sum = array.reduce(add, 0);

    function add(a, b) {
        return a + b;
    }

    return sum;
}