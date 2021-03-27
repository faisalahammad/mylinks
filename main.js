
// var form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//     console.log("Saving value", form.elements.value.value);
//     event.preventDefault();
// });
const domain = "https://bacloud14.github.io/so-cards/card.html?"
function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(data.entries());
    // const results = document.querySelector('.results pre');
    // console.log(JSON.stringify(formJSON, null, 2));
    const simpleURL = new URLSearchParams(formJSON).toString()
    const shortestString = domain + Object.values(formJSON).join("|")
    new QRCode(document.getElementById("qrcode"), shortestString);
    console.log(shortestString);
}


const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);