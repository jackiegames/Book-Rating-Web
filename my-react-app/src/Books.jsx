import {useState, useEffect} from "react";
function Books(){
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks(){
            try{
                // const h1Element = document.getElementById("info");
                // const description = document.getElementById("synopsis");
                // const title = document.getElementById("input").value;
                // const rate = document.getElementById("rate");

                const response = await fetch(`https://openlibrary.org/search.json?q=subject%3Afiction&fields=key,title,author_name,cover_i,first_publish_year,edition_count,description&limit=12&sort=editions`);
                
                if(!response.ok){
                    throw new Error("Could not fetch resources");
                }

                const data = await response.json();
                setBooks(data.docs || []); //if the data.docs exists use an empty array

                } catch(error){
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        fetchBooks();
    }, []);

    if(loading){
        return <p>Loading Books...</p>;
    }

    return(
        <div className="books-container">
            {books.map((book) => (
                <div className="card" key={book.key}>
                    <img className="card-image" 
                        src={
                                book.cover_i ?
                                `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : ""}
                                alt="candles"/>
                    <h2 className="card-title">Title: {book.title}</h2>


                    <p className="card-text">Author: {book.author_name}</p>


                    <p className="card-text">Publish year {book.first_publish_year}</p>

                    <p className="card-text">Description: {book.description}</p>
                    </div>
            ))}
        </div>
    );
}

export default Books