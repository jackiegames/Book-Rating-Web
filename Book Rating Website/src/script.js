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
// const result = document.getElementById("info");
// let input = document.getElementById("input");
// const button = document.getElementById("cardButton ");

// button.onclick = function(){
//     result.textContent = "HELLO";
// }

fetchData();
async function fetchData(){
    try{
        const h1Element = document.getElementById("info");
        const description = document.getElementById("synopsis");
        const title = document.getElementById("input").value;
        const rate = document.getElementById("rate");


        const response = await fetch(`https://openlibrary.org/search.json?q=${title}&fields=description`);
        
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const book = data.docs[0];
        h1Element.textContent = book.author_name;
        description.textContent = book.description;

        const image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const imgElement = document.getElementById("book-image");
        imgElement.src = image;
        imgElement.style.display = "block";
        rate.style.display = "block";
    }
        catch(error){
            console.error(error);
        }
}

async function rateBook(){
    
}

