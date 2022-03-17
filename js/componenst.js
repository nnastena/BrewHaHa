const pages=[
    {name:'Home', pageLink:'./index.html'},
    {name:'About', pageLink:"./about.html"}, 
    {name:'Menu', pageLink:"./menu.html"},
    {name:'News', pageLink:"./news.html"},
    {name:'Contacts', pageLink:"./contacts.html"}]

let header = document.getElementsByClassName('header');
let logo = document.createElement("a");
logo.appendChild(document.createTextNode('BREW HA-HA!'));
logo.className='logo'
logo.href='./index.html'
let nav = document.createElement("nav");
nav.className='header__nav'
let header_ul = document.createElement("ul");
header_ul.className='header__ul'
console.log(header)

pages.map(item=>{
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.appendChild(document.createTextNode(item.name));
    a.className='header__item'
    a.href = item.pageLink
    li.appendChild(a);
    header_ul.appendChild(li);
})

nav.appendChild(header_ul);
header[0].appendChild(logo);
header[0].appendChild(nav);

let footer = document.getElementsByClassName('footer');

