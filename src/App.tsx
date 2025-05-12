import React from 'react';
import UserList from './components/UserList/UserList.tsx';
import './App.scss';

const App: React.FC = () => {
    return (
        <div className="app">
            <UserList />
        </div>
    );
}

export default App;