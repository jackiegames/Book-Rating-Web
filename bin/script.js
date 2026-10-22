// const userCardTemplate = document.querySelector("[data-user-template]")
// const userCardContainer = document.querySelector("[data-user-cards-container]")

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(res => res.json()
//     .then(data =>{
//         const card = userCardTemplate.content.cloneNode(true).children[0]
//         const header = card.querySelector("[data-header]")
//         const body = card.querySelector("[data-body]")
//         header.textContent = user.name
//         body.textContent = user.email
//         userCardContainer.append(card)

//     }))
const result = document.getElementById("p1");

document.getElementById("submit").onclick = function(){
    result.textContent = "Hello";
}