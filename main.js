
// var form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//     console.log("Saving value", form.elements.value.value);
//     event.preventDefault();
// });
function handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    // const results = document.querySelector('.results pre');
    console.log(JSON.stringify(formJSON, null, 2));

    new QRCode(document.getElementById("qrcode"), JSON.stringify(formJSON));
}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);