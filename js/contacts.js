const form = document.getElementById("contactForm")
const nameInpun = document.getElementById("contactName")
const phoneInput = document.getElementById("contactPhone")
const emailInput = document.getElementById("contactEmail")
const subjectInput = document.getElementById("contactSubject")
const textInput = document.getElementById("contactMessage")
const url ="http://localhost:3000/messages"

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    console.log(nameInpun.value)
    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            name: nameInpun.value,
            phone: phoneInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            text: textInput.value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    alert("Your message has been sent. We will contact you within a few hours.")
})
