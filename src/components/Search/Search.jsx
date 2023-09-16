import "./Search.css"

const Search = () => {
    return (
<>
<section className="search-container">
    <input type="text" placeholder="Buscar Pokemon" className="search-input"/>
    <button className="search-btn"><i className='bx bx-search'></i></button>
</section>
</>
    )
};

export default Search;