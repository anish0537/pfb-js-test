import React, {useState} from 'react';
import { Input } from 'antd';
// STYLES
import './style.scoped.scss';

const SearchInput = ({collection, setFilter, filterFor, hasValue}) => {

    const filterDataByInput = (e) => {
        const value = e.target.value;
        const filtered = collection.filter(element => {
            const arr = [];
            filterFor.forEach(key => arr.push(element[key].toUpperCase().indexOf(value.toUpperCase()) !== -1));
            return arr.some(v => v === true);
        });
        setFilter(filtered);
        hasValue(value !== '' ? true : false);
    }

    return (
        <div className='search-wrapper'>
            <Input onChange={filterDataByInput} placeholder='Search by name or team' />
        </div>
    );
};

export default SearchInput;