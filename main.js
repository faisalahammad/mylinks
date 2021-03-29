
// var form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//     console.log("Saving value", form.elements.value.value);
//     event.preventDefault();
// });
const domain = "https://so-c.me/card.html?"
function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(data.entries());
    // const results = document.querySelector('.results pre');
    // console.log(JSON.stringify(formJSON, null, 2));
    const simpleURL = new URLSearchParams(formJSON).toString()
    const shortestString = /*domain +*/ Object.values(formJSON).join(",")
    const encodedString = domain + btoa(shortestString)
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


const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

function langChange(el) {
    console.log('ffffff')
    document.body.setAttribute('lang', el.value);
}

document.getElementById('fr_lang').onclick = function () {
    langChange('fr')
}