var search = atob(location.search.substring(1));
var vals = search.split(",")
var keys = ["user", "instagram", "youtube", "facebook", "twitter", "snapchat", "envelope", "phone"]
var colors = ["", "#c32aa3;", "#d71e18;", "#1877f2;", "#1da1f2;", "#fffc00;", "", ""]
// var object = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
const form = document.querySelector('.form1');
form.insertAdjacentHTML('afterend', generateSvg())
keys.forEach(function (key, i) {
    if (!vals[i])
        return
    if (key === "envelope") {
        form.insertAdjacentHTML('afterend', `<a href="mailto:${vals[i]}">${vals[i]}</a><br>`)
        return
    }

    if (key === "phone") {
        form.insertAdjacentHTML('afterend', `<a href="tel:${vals[i]}">${vals[i]}</a><br>`)
        return
    }
    var x = document.createElement("I");
    x.setAttribute("class", `fa fa-${key} icon`);
    form.appendChild(x)

    var y = document.createElement("INPUT");
    y.setAttribute("class", "input-field");
    y.setAttribute("value", vals[i]);
    y.setAttribute("type", "text");
    y.setAttribute("style", `background-color: ${colors[i]}`)
    y.setAttribute("readonly", "readonly");
    form.appendChild(y)
})

function getRandomItem(list) {
    var random_index = Math.floor(Math.random() * list.length);
    return list[random_index];
}

function generateSvg() {
    var svg = '';
    var width = 50;
    var height = 50;
    var width_choices = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
    var fill_choices = ['gray', 'gray', 'maroon', 'maroon', 'maroon', 'maroon', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'];
    var stroke_choices = [1, 3, 5];
    
    for (var index_x = 0; index_x < 7; index_x++) {
        for (var index_y = 0; index_y < 7; index_y++) {
            var rectangle_width = getRandomItem(width_choices);
            var rectangle_height = getRandomItem(width_choices);
            var random_fill_color = getRandomItem(fill_choices);
            var random_stroke_width = getRandomItem(stroke_choices);
            svg = svg + '<rect x="' + index_x * width + '" y="' + index_y * height +
                '" width="' + rectangle_width + '" height="' + rectangle_height +
                '" stroke="black" fill="' + random_fill_color + '" stroke-width="' + random_stroke_width + '"/>';
        }
    }
    return '<div id="art"> <svg width="400" height="400">' + svg + '</svg> </div>';
}


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