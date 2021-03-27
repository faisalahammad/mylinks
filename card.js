var search = atob(location.search.substring(1));
var vals = search.split(",")
var keys = ["user", "instagram", "envelope", "youtube", "facebook", "phone"]
// var object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
const form = document.querySelector('.form1');

keys.forEach(function(key, i) {
    if(! vals[i])
        return
    if(key==="envelope") {
        form.insertAdjacentHTML('afterend', `<a href="mailto:${vals[i]}">${vals[i]}</a><br>`)
        return
    }
    
    if(key==="phone") {
        form.insertAdjacentHTML('afterend', `<a href="tel:${vals[i]}">${vals[i]}</a><br>`)
        return
    }
    var x = document.createElement("I");
    x.setAttribute("class", `fa fa-${key} icon`);
    form.appendChild(x)

    var y = document.createElement("INPUT");
    y.setAttribute("class", "input-field");
    y.setAttribute("value", vals[i]);
    y.setAttribute("disabled", "");
    form.appendChild(y)    
})
// for (const key in object) {
//     if (Object.hasOwnProperty.call(object, key)) {
//         const element = object[key];
//         console.log(element)
//         var x = document.createElement("I");
//         x.setAttribute("class", `fa fa-${key} icon`);
//         form.appendChild(x)

//         var y = document.createElement("INPUT");
//         y.setAttribute("class", "input-field");
//         y.setAttribute("value", element);
//         y.setAttribute("disabled", "");
//         form.appendChild(y) 
//     }
// }

{/* 
<i class="fa fa-user icon"></i>
<class="input-field" name="whoami" type="text" >
<i class="fa fa-instagram icon"></i>
<input class="input-field" name="instagram" type="text" >
<i class="fa fa-envelope icon"></i>
<input class="input-field" name="mail" type="text" >
<i class="fa fa-youtube icon"></i>
<input class="input-field" name="youtube" type="text" >
<i class="fa fa-facebook icon"></i>
<input class="input-field" name="facebook" type="text" ></input>
 */}