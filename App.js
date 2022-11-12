import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from "./useBookSearch";
import Navbar from './Navbar';
import { Body } from './App.style';
import Book from './Book';
import FilterBox from './FilterBox';
import { useEffect } from 'react';
import { filterTheBooks } from './utils';

const App = ()=>{
    const [filterCount, setFilterCount] = useState({title: 0, subject: 0, published_date: 0, author: 0})
    const [query, setQuery] = useState('the lord of rings')
    const [pageNumber, setPageNumber] = useState(1)
    const [filter, setFilter] = useState(false);
    const [filterParams, setFilterParams ] = useState({title: '', subject:'', published_date: '', author:''});
    const [redBooks, setRedBooks] = useState([]);
    const {
        books,
        hasMore,
        loading,
        error
    } = useBookSearch(query, pageNumber, filterParams)
    console.log(redBooks)
    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) 
                setPageNumber(prevPageNumber => prevPageNumber + 1)
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
        setFilterParams({title: '', subject:'', published_date: '', author:''});
    }

  const isFilterOn = (filterParams)=>{
    if(filterParams.author) return true;
    else if(filterParams.subject) return true;
    else if(filterParams.published_date) return true;
    else if(filterParams.title) return true;
    return false;
  }


    useEffect(()=>{
            if(isFilterOn(filterParams)){
                setRedBooks(filterTheBooks(books,filterParams, setFilterCount));
            }
            else
                setRedBooks(books);

    },[filterParams, books, loading])

    console.log(filterCount)
    return (
        <>
        {filter && <FilterBox filter={filter} setFilter={setFilter} filterParams={filterParams} setFilterParams={setFilterParams}/>}
            <Navbar query={query} filter = {filter} setFilter={setFilter} handleSearch={handleSearch}></Navbar>

            <div>
                {filterParams.author.length > 0 && <p>Authors Matched : {filterCount.author}</p>}
                {filterParams.subject > 0 && <p>Subject Matched : {filterCount.subject}</p>}
                {filterParams.title.length > 0 && <p>Title Matched : {filterCount.title}</p>}
                {filterParams.published_date.length > 0 && <p>Date Matched : {filterCount.published_date}</p>}
            </div>
            <Body>
            {redBooks.map((book, index) => {
                if (redBooks.length === index + 1) {
                    return <Book lastBookElementRef={lastBookElementRef} key={book.title + index} book = {book}></Book>
                } else {
                    return <Book lastBookElementRef = {null} key={book.title + index} book={book} />
                }
            })}

            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
            </Body>
        </>
    );

    // return (
    // <>
    //     <input type="text" value={query} onChange={handleSearch}></input>
    //     {books.map((book, index) => {
    //         if (books.length === index + 1) {
    //             return <div ref={lastBookElementRef} key={book}>{book}</div>
    //         } else {
    //             return <div key={book}>{book}</div>
    //         }
    //     })}
    // </>
    // );
}

export default App;