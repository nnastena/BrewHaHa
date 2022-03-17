const blogUrl = 'http://localhost:3000/blog';

let newsList = document.getElementById("newsList")
let article = document.getElementById("article")

//получение всех статей
const getData = async () =>{
    await fetch( blogUrl)
    .then( (response) => { return response.json(); } )
    .then((data) => {
        data.map(item=>{
            
            let li = document.createElement("li");
            li.className="item"

            let div1 = document.createElement('div');
            div1.className="item__img"
            let div2 = document.createElement('div');
            div2.className="item__article"

            let img =document.createElement('img');
            img.src=item.articleImg;
            img.alt="article photo"
            div1.appendChild(img);

            let span1 = document.createElement('span');
            span1.className="item__date"
            let icon1Div = document.createElement('div');
            let icon1 =document.createElement('img');
            icon1.src="./images/icons/calendar.svg"
            icon1Div.appendChild(icon1)
            span1.appendChild(icon1Div);
            span1.appendChild(document.createTextNode(item.date));


            let h5= document.createElement('h5')
            h5.className="item__name"
            h5.appendChild(document.createTextNode(item.title));

            let footerDiv = document.createElement('div');
            footerDiv.className="item__footer"

            let button = document.createElement('button');
            button.className = "item__button"
            button.onclick = function(){
                bigArticle(item.id)
            }
            button.appendChild(document.createTextNode("Read more"));
            
            let span = document.createElement('span');
            span.className="item__comments"
            let icon2Div = document.createElement('div');
            let icon2 =document.createElement('img');
            icon2.src="./images/icons/sms.svg"
            icon2Div.appendChild(icon2)
            span.appendChild(icon2Div);

            footerDiv.appendChild(button)
            footerDiv.appendChild(span)

            div2.appendChild(span1)
            div2.appendChild(h5)
            div2.appendChild(footerDiv)

            li.appendChild(div1)
            li.appendChild(div2)
            newsList.appendChild(li)
        })
    } )
    .catch((message) => console.log("Error message " + message ));
}
getData();


//отрисовка одной статьи по ID
function bigArticle(id){
    newsList.style.display="block"
    newsList.className="news__littleList"
    article.className="articleBig"
    console.log(id)
    while (article.firstChild) {
        article.removeChild(article.firstChild);
    }

    fetch(blogUrl+ "/"+id)
    .then( (response) => { return response.json(); } )
    .then((item) => {
        
        let div1 = document.createElement('div');
        div1.className="articleBig__details"

        let span1Div1 = document.createElement('span');
        span1Div1.appendChild(document.createTextNode(item.autor));

        let span2Div1 = document.createElement('span');
        let iconDiv = document.createElement('div');
        let icon =document.createElement('img');
        icon.src="./images/icons/calendar.svg"
        iconDiv.appendChild(icon)
        span2Div1.appendChild(iconDiv);
        span2Div1.appendChild(document.createTextNode(item.date));

        div1.appendChild(span1Div1)
        div1.appendChild(span2Div1)
        article.appendChild(div1)

        let div2 = document.createElement('div');
        div2.className="articleBig__illustration"
        let img =document.createElement('img');
        img.src=item.articleImg;
        img.alt="article photo"
        div2.appendChild(img);
        article.appendChild(div2)

        let h4= document.createElement('h4')
        h4.className="articleBig__title"
        h4.appendChild(document.createTextNode(item.title));
        article.appendChild(h4)

        item.content.map(art =>{

            let h5= document.createElement('h5')
            h5.className="articleBig__name"
            h5.appendChild(document.createTextNode(art.name));
            article.appendChild(h5)

            art.text.map(textik=>{
                let p = document.createElement('p');
                p.className="articleBig__text"
                p.appendChild(document.createTextNode(textik));
                article.appendChild(p)
            })

            let div3 = document.createElement('div');
            div3.className="articleBig__illustration"
            let img =document.createElement('img');
            img.src=art.img;
            img.alt="article photo"
            div3.appendChild(img);
            article.appendChild(div3)
        })

        let ul= document.createElement('ul')
        ul.className="articleBig__list"

        item.tags.map(tag=>{
            let li= document.createElement('li')
            li.className="articleBig__tag"
            li.appendChild(document.createTextNode(tag));
            ul.appendChild(li)
        })
        article.appendChild(ul)


        let form = document.createElement('form')
        form.className="form"
        form.id="form"
        let formTitle= document.createElement('h5')
        formTitle.className="articleBig__name"
        formTitle.appendChild(document.createTextNode("Leave a comment"));
        form.appendChild(formTitle)

        let input1 = document.createElement('input')
        input1.className="form__nameInput"
        input1.placeholder="Enter your name"
        input1.id="nameInput"
        input1.setAttribute("required", "required" )
        let input2 = document.createElement('textarea')
        input2.className="form__textInput"
        input2.placeholder="Add a comment"
        input2.id="textInput"
        input2.setAttribute("required", "required" )
        let buttonForm = document.createElement('button')
        buttonForm.className="form__button"
        buttonForm.appendChild(document.createTextNode("Public"));

        form.appendChild(input1)
        form.appendChild(input2)
        form.appendChild(buttonForm)

        form.addEventListener('submit', (event)=>{
            event.preventDefault()
            const input1 = document.getElementById('nameInput');
            const input2 = document.getElementById('textInput');
            const date= new Date();
            let arr=["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            const dateRes = arr[date.getMonth()] + ' '+ date.getDate() + ', '+date.getFullYear() + ' AT ' + date.toLocaleTimeString().slice(0, 5)
            fetch(blogUrl+ "/"+id,{
                method: "PATCH",
                body: JSON.stringify({
                    comments: [...item.comments, 
                        {
                            "userName": input1.value,
                            "commentText": input2.value,
                            "commentDate": dateRes,
                            "userImg": "./images/chefs/chef-1.jpg"
                        }
                    ],
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        })

        article.appendChild(form)

        let commentList= document.createElement('ul')
        commentList.className="articleBig__commentList"

        let commentsTitle= document.createElement('h5')
        commentsTitle.className="articleBig__name"
        commentsTitle.appendChild(document.createTextNode("Comments"));
        commentList.appendChild(commentsTitle)

        item.comments.map(com=>{
            let liComment= document.createElement('ul')
            liComment.className="comment"

            let divPhoto = document.createElement('div');
            divPhoto.className="comment__userPhoto"
            let img =document.createElement('img');
            img.src=com.userImg;
            img.alt="user photo"
            divPhoto.appendChild(img);

            let divDetails = document.createElement('div');
            divDetails.className="comment__details"
            let h6= document.createElement('h6')
            h6.className="comment__userName"
            h6.appendChild(document.createTextNode(com.userName));
            let spanDate= document.createElement('span')
            spanDate.className="comment__date"
            spanDate.appendChild(document.createTextNode(com.commentDate));

            divDetails.appendChild(h6)
            divDetails.appendChild(spanDate)

            let comText= document.createElement('p')
            comText.className="comment__text"
            comText.appendChild(document.createTextNode(com.commentText));

            liComment.appendChild(divPhoto);
            liComment.appendChild(divDetails);
            liComment.appendChild(comText);

            commentList.appendChild(liComment)
        })

        article.appendChild(commentList)
    })
}


