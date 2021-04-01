const domain = "https://so-c.me/card.html?"

const version = 0
// When necessary create a new implementation for URL codification.
// Anyway, it must be of form /card.html?{.*}|/d
function codify(formJSON) {
    switch (version) {
        case 0:
            const shortestString = /*domain +*/ Object.values(formJSON).join(",")
            return domain + btoa(shortestString) + `|${version}`   // version 0 
        // case 1: TODO
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
