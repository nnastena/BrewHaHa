const menuUrl = 'http://localhost:3000/menu';

//функция для добавления  элемента в опредененный список и дальнейшей отрисовки
function addItemToList(item, List){
    let li = document.createElement("li");
    li.className="menu__item"

    let div1 = document.createElement('div');
    div1.className="menu__item-illustration"
    let div2 = document.createElement('div');

    let img =document.createElement('img');
    img.src=item.img;
    img.alt="dish photo"
    div1.appendChild(img);

    let h4= document.createElement('h4')
    h4.className="menu__item-title"
    h4.appendChild(document.createTextNode(item.name));
    let p = document.createElement('p');
    p.className = "menu__item-paragraph"
    p.appendChild(document.createTextNode(item.composition));
    

    let span = document.createElement('span');
    span.appendChild(document.createTextNode('$'+item.price));
    span.className="menu__item-price"
    h4.appendChild(span)

    div2.appendChild(h4)
    div2.appendChild(p)
    li.appendChild(div1)
    li.appendChild(div2)
    List.appendChild(li)
}

//получение данных и их отрисовка
const getData = async () =>{
    await fetch( menuUrl)
    .then( (response) => { return response.json(); } )
    .then((data) => {
        let breakfastList =document.getElementById("breakfast");
        let saladsList =document.getElementById("salads");
        let sandList =document.getElementById("sandwiches");
        let soupList =document.getElementById("soup");
        let entreesList =document.getElementById("entrees");
        let snackList =document.getElementById("snack");
        let dessertsList =document.getElementById("desserts");
        let drinksList =document.getElementById("drinks");
        data.breakfast.map(item =>{
            addItemToList(item, breakfastList)
        })
        data.salads.map(item =>{
            addItemToList(item, saladsList)
        })
        data.sandwiches.map(item =>{
            addItemToList(item, sandList)
        })
        data.soup.map(item =>{
            addItemToList(item, soupList)
        })
        data.snacks.map(item =>{
            addItemToList(item, snackList)
        })
        data.entrees.map(item =>{
            addItemToList(item, entreesList)
        })
        data.drinks.map(item =>{
            addItemToList(item, drinksList)
        })
        data.desserts.map(item =>{
            addItemToList(item, dessertsList)
        })
    } )
    .catch((message) => console.log("Error message " + message ));
}
getData();