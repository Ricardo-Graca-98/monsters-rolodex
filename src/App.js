import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component.jsx';
import SearchBox from './components/search-box/search-box.component.jsx';
import './App.css';

const App = () => {
    const [searchField, setSearchField] = useState(''); // [value, setValue]
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilterMonsters] = useState(monsters);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => setMonsters(users));
    }, []);

    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLowerCase().includes(searchField);
        });

        setFilterMonsters(newFilteredMonsters);
    }, [monsters, searchField]);

    const onSearchChange = (event) => {
        setSearchField(event.target.value.toLowerCase());
    };

    return (
        <div className='App'>
            <h1 className='app-title'>Monsters Rolodex</h1>
            <SearchBox onChangeHandler={onSearchChange} placeholder='Search monsters...' className='monsters-search-box' />
            <CardList monsters={filteredMonsters} />
        </div>
    );
};

export default App;
