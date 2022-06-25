import React, {useCallback, useEffect, useState} from 'react';
import {debounce} from '../../utils/debounce';
import {isAddress} from '../../utils/isAddress';
import PropTypes from 'prop-types';

const SearchInput = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const submitQuery = useCallback(debounce(async (query) => {
    if(isAddress(query)){
      onSearch(query);
    }
  }, 400), []);

  useEffect(() => {
    if(query) {
      submitQuery(query);
    }
  }, [query]);

  return (
      <div className="w-full flex justify-center px-4 mb-24">
        <input placeholder="Search NFTs bro..." onChange={e => setQuery(e.target.value)} value={query}
               className="w-full p-4 bg-transparent max-w-lg text-white resize-none border focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 rounded-lg border-borderGrey" type="text"/>
      </div>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchInput;