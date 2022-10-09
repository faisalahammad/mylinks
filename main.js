const progressbar = document.querySelector(".progress");
const error = document.querySelector(".error");

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

function codify(formJSON) {
    var vals = Object.values(formJSON).map((val) => val.trim());
    var key = vals.pop();
    vals = key ? vals.map((val) => {
        if (val)
            return XORCipher.encode(key, val)
        return val;
    }) : vals;
    var shortestString = vals.join(",");
    var envPath = window.location.href;
    // localhost includes index.html but not on web server
    // so remove it from path on localhost environment
    if (envPath.indexOf('file:///') === 0) {
        envPath = envPath.split('/index.html')[0]
    }
    return `${envPath}/card.html#` + btoaVerified(shortestString) + order
}

var formData
var limit = 300;
// Manipulate dom on key strokes
function handleFormKeyStrokes() {
    formData = new FormData(document.querySelector('.form1'));
    const formJSON = Object.fromEntries(formData.entries());
    const encodedString = codify(formJSON)
    var percentage = (encodedString.length / limit) * 100;
    setTimeout(() => changeProgress(percentage), 1000);
}
// Manipulate dom on form submit
function handleFormSubmit(event) {
    getOrder();
    event.preventDefault();
    formData = new FormData(document.querySelector('.form1'));
    differForConn()
}
// Attach handleFormKeyStrokes
const form = document.querySelector('.contact-form');
form.addEventListener('keyup', handleFormKeyStrokes);
form.addEventListener('submit', handleFormSubmit);
// Language selector.
function langChange(el) {
    // check for right to left formating
    if (el.value === 'ar') { document.dir = "rtl" } else { document.dir = "ltr" }
    Stone.setLocale(el.value);
}

window.addEventListener('DOMContentLoaded', e => {
    let langOptions = Array.from(document.querySelector("#lang-select").options);
    let defaultLang = langOptions.filter(option => option.defaultSelected == true)[0];
    langChange(defaultLang);
});

function copyLink() {
    /* Get the text field */
    var copyText = document.getElementById("to_copy");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
}

function clearPreviousQR() {
    document.getElementById("qrcode").innerHTML = '';
    document.querySelector("#link").innerHTML = '';
}

var order
// Used to for default fields
const socialArray = ["instagram", "youtube", "facebook", "twitter", "snapchat"]
// Used to share QR or main page
const socialArray2 = ['vk', 'facebook', 'twitter', 'telegram', 'skype', 'whatsapp', 'mail']

function getOrder() {
    order = [0, 0, 0, 0, 0];

    var socials = document.getElementsByClassName("sortable-input");
    var i = 1;
    for (var social of socials) {
        order[socialArray.indexOf(social.name)] = i;
        i += 1;
    }
    order = order.join('');
}

function handleDom() {
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(formData.entries());
    const encodedString = codify(formJSON)
    _id = (Math.random().toString(36).substr(4))

    // const simpleURL = new URLSearchParams(formJSON).toString()
    if (document.querySelector("#link").innerHTML != '') {
        clearPreviousQR();
    }
    var canvas = document.getElementById('qrcode');
    QRCode.toCanvas(canvas, encodedString, function (error) {
        if (error) {
            error.innerHTML = "Internal text!";
            console.error(error)
            return;
        }
        console.log('success!');
    })

    dataURL = canvas.toDataURL();
    var a = document.createElement('a');
    var linkText = document.createTextNode("Share my link");
    a.appendChild(linkText);
    a.title = "My link";
    a.href = encodedString;


    document.querySelector('#link').insertAdjacentHTML('beforeend', "<br><a download='my_qr_code.png' href='" + dataURL + "'>Download QR code</a> | ");
    document.querySelector('#link').insertAdjacentHTML('beforeend', "<a style='cursor:pointer' onClick='printAsPDF()'>Print As PDF</a> | ");
    document.querySelector('#link').appendChild(a);

    document.querySelector('#link').insertAdjacentHTML('beforeend', "<br><div style='display:flex'><input type='text' value='" + encodedString + "' id='to_copy' readonly><i class='fa fa-copy icon' onclick='copyLink()'></i></div>");
    for (const sharer of socialArray2) {
        var b = document.createElement('a');
        var shareText = `<i class="fa fa-${sharer}"></i>&nbsp;${sharer}&nbsp;&nbsp;`;
        // <button class="button" data-sharer="buffer" data-via="ellisonleao" data-picture="https://ellisonleao.github.io/sharer.js/img/socialbg.png" data-title="Sharer.js is the ultimate sharer js lib" data-url="https://ellisonleao.github.io/sharer.js/">Share on Buffer</button>
        // b.setAttribute('class', `btn-${sharer}`);
        b.setAttribute('data-sharer', sharer);
        b.setAttribute('data-picture', dataURL);
        b.setAttribute('data-via', 'data-via');
        b.setAttribute('data-id', sharer);
        b.setAttribute('data-title', 'Check my links');
        b.innerHTML = shareText;
        document.querySelector('#link').appendChild(b);
    }
    document.getElementById('qrcode').scrollIntoView();
    window.Sharer.init();
}

const printAsPDF = () => {
    printJS({ printable: dataURL, type: 'image', header: `QR code of ${form.children[0].children[0][0].value}` })
}


const changeProgress = (progress) => {
    progressbar.style.width = `${progress}%`;
    if (progress > 100) {
        progressbar.style.width = `100%`;
        progressbar.style.backgroundColor = `black`;
        document.getElementById('submit').disabled = true;
        error.innerHTML = "You exceeded the text limit!";
    } else {
        progressbar.style.backgroundColor = `#47ff8d`;
        document.getElementById('submit').disabled = false;
        error.innerHTML = "";
    }
};

function differForConn() {
    setTimeout(
        function () {
            handleDom();
            // subscribe();
        }, 1000);
}
var _id;

Stone.enableDomScan(true);

Stone.addCatalogs(stoneJsCatalogs);