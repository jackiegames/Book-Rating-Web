import useEffect from "react";
function Search(){

    useEffect(() => {
        
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
            
        }
            catch(error){
                console.error(error);
            }
        return(
            <div>
                <img src={image}></img>
                <p>Description: {book.description}</p>
            </div>
        );
    }

    return(
    <div id="container">
        <h1 id="logo">On the Shelf</h1>
        <form>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
            <div className="search">
                <span className="search-icon material-symbols-outlined">search</span>
                <input className="search-input" type="search" id="input" placeholder="new read!"/>
                <button onClick={fetchData} id="submit">Submit</button>
            </div>
            </form>

        </div>
    )
}

export default Search;