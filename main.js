String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return "" + hash;
};

// A verified version of btoa
function btoaVerified(s) {
    return btoa(s) + "@" + btoa(s).hashCode()
}

const domain = "https://so-c.me/card.html?"

const version = 1
var shortestString
// When necessary create a new implementation for URL codification.
// Anyway, it must be of form /card.html?{.*}|/d
function codify(formJSON) {
    switch (version) {
        case 0:
            shortestString = /*domain +*/ Object.values(formJSON).join(",")
            return domain + btoa(shortestString) + `|${version}`   // version 0 
        case 1:
            shortestString = /*domain +*/ Object.values(formJSON).join(",")
            return domain + btoaVerified(shortestString) + `%${version}`   // version 0 
        default:
            break;
    }
}

// Manipulate dom on form submit
function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(data.entries());
    const encodedString = codify(formJSON)
    // const simpleURL = new URLSearchParams(formJSON).toString()
    new QRCode(document.getElementById("qrcode"), encodedString);
    var canvas = document.getElementById('qrcode').querySelector('canvas');
    var dataURL = canvas.toDataURL();
    var a = document.createElement('a');
    var linkText = document.createTextNode("Share my link");
    a.appendChild(linkText);
    a.title = "My link";
    a.href = encodedString;
    document.querySelector('#link').insertAdjacentHTML('beforeend', "<br><a download='my_qr_code.png' href='" + dataURL + "'>Download QR code</a> | ");
    document.querySelector('#link').appendChild(a);
    document.querySelector('#link').insertAdjacentHTML('beforeend', "<br><code>" + encodedString + "</code>");
    console.log(encodedString);
}
// Attach handleFormSubmit
const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

// Language selector.
function langChange(el) {
    document.body.setAttribute('lang', el.value);
}
