import React, { useState, useEffect, useContext } from "react";
import { debounce } from "lodash";
import { SearchContext } from "../../stores/SearchStore";

// components
import SearchInput from "../../components/General/SearchInput";

// containers
import Results from "../Results";

// service
import { titleSearch } from "../../utils/services";

export default function Search(props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const store = useContext(SearchContext);
  const {
    setSearchData,
    setSearchString,
    setSearchPage,
    setMoreButton
  } = store.actions;

  const onHandleChange = debounce(value => {
    if (value.length > 3) {
      setLoading(true);
      setSearchString(value);
      setMessage("");
      setSearchData([]);
      setHasData(false);
      getResults(value, 1); //callback
    }
  }, 600);

  async function getResults(search, count) {
    setLoading(true);

    try {
      const results = await titleSearch(search, count);

      if (results.data.Response === "False") {
        // error
        setLoading(false);
        setSearchData([]);
        setMessage(results.data.Error);
      } else {
        // success
        setLoading(false);
        setSearchData(
          search === store.search
            ? store.data.concat(results.data.Search)
            : results.data.Search
        );
        setMessage(`Results for "${search}"`);
      }

      // if there is more content to load
      if (parseInt(results.data.totalResults) > store.data.length) {
        setMoreButton(true);
        setSearchPage(count + 1);
      } else {
        setMoreButton(false);
      }
    } catch (error) {
      setMessage(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (store.data && store.data.length > 0) {
      // brings data from store

      setMessage(`Results for "${store.search}"`);
      setHasData(true);
    } else {
      setSearchString("Batman");
    }

    // unmount
    return () => {
      setSearchData(store.data);
      setSearchString(store.search);
      setSearchPage(store.count);
      setMoreButton(store.more);
    };
  }, []);

  useEffect(() => {
    if (store.search.length > 0) {
      getResults(store.search, store.count);
      setSearchPage(1);
      setMessage("Loading");

      if (store.search === "") {
        setMessage("");
      }
    }
  }, [store.search]);

  return (
    <>
      <section className="search-form">
        <div className="wrapper container-fluid">
          <h2>{props.title}</h2>

          <SearchInput
            name="movie-search-input"
            placeholder="Type here..."
            onChange={e => onHandleChange(e.target.value, store.count)}
          />
        </div>
      </section>

      <Results
        loading={loading}
        search={store.search}
        movies={store.data}
        title={message}
        more={store.more}
        onClickButton={() => getResults(store.search, store.count)}
      />
    </>
  );
}
