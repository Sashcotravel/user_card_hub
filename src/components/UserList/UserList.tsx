import React, { useState, useEffect } from 'react';
import UserCard from '../UserCard/UserCard.tsx';
import UserFilter from '../UserFilter/UserFilter.tsx';
import { UserService } from '../../services/UserService.ts';
import { User } from '../../models/User.ts';
import './UserList.scss';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string>('name');
    const [filterValue, setFilterValue] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            try {
                const userService = new UserService(API_URL);
                const fetchedUsers = await userService.getUsers();

                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
                setLoading(false);
                throw new Error(err as string | undefined);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!users.length) return;

        if (filterValue === '') {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(user => {
            try {
                const propertyPath = filterType.split('.');
                let propertyValue: any = user;

                for (const key of propertyPath) {
                    propertyValue = propertyValue[key as keyof typeof propertyValue];
                    if (propertyValue === undefined || propertyValue === null) {
                        return false;
                    }
                }

                const stringValue = String(propertyValue).toLowerCase();
                const searchValue = filterValue.toLowerCase();

                return stringValue.includes(searchValue);
            } catch (error) {
                console.error("Error during filtering:", error);
                return false;
            }
        });

        setFilteredUsers(filtered);
    }, [filterType, filterValue, users]);

    const handleFilterChange = (type: string, value: string): void => {
        setFilterType(type);
        setFilterValue(value);
    };

    if (loading) return <div className="loading">Loading users...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-list-container">
            <h1>User Card Hub</h1>
            <UserFilter onFilterChange={handleFilterChange} />
            {filteredUsers.length === 0 ? (
                <div className="no-results">No users found matching your filter criteria.</div>
            ) : (
                <div className="user-list">
                    {filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;