
// var form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//     console.log("Saving value", form.elements.value.value);
//     event.preventDefault();
// });
function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(data.entries());
    // const results = document.querySelector('.results pre');
    console.log(JSON.stringify(formJSON, null, 2));

    new QRCode(document.getElementById("qrcode"), JSON.stringify(formJSON));
    console.log(formJSON)

    let u = new URLSearchParams(formJSON).toString();

    console.log(u);
}


const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);