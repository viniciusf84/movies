import { action, decorate, observable } from 'mobx';
import { createContext } from 'react';

class SearchStore {
    
    search = '';
    data = [];
    count = 1;
    more = false;

    setSearchData(newSearch) {
        this.data = newSearch;
    }
    
    setSearchString(newString) {
        this.search = newString;
    }
    
    setSearchPage(newPage) {
        this.count = newPage;
    } 

    setMoreButton(bool) {
        this.more = bool;
    } 
     
}

decorate(SearchStore, { 
    search: observable,
    data: observable,
    count: observable,
    more: observable,   
    setSearchData: action,
    setSearchString: action,
    setSearchPage: action,
    setMoreButton: action
});

// const store = window.store = new SearchStore();

export const SearchStoreContext = createContext(new SearchStore());