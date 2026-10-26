import useEffect from "react";
function Search(){

    return(
    <div id="container">
        <h1 id="logo">On the Shelf</h1>
        <form>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
            <div className="search">
                <span className="search-icon material-symbols-outlined">search</span>
                <input className="search-input" type="search" id="input" placeholder="new read!"/>
                {/* <button onClick="" id="submit">Submit</button> */}
            </div>
            </form>

        </div>
    )
}

export default Search;