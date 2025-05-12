import React, { useState, ChangeEvent } from 'react';
import './UserFilter.scss';

interface UserFilterProps {
    onFilterChange: (filterType: string, filterValue: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilterChange }) => {
    const [filterType, setFilterType] = useState<string>('name');
    const [filterValue, setFilterValue] = useState<string>('');

    const handleFilterTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newFilterType = e.target.value;
        setFilterType(newFilterType);
        onFilterChange(newFilterType, filterValue);
    };

    const handleFilterValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilterValue = e.target.value;
        setFilterValue(newFilterValue);
        onFilterChange(filterType, newFilterValue);
    };

    return (
        <div className="user-filter">
            <div className="filter-container">
                <div className="filter-group">
                    <label htmlFor="filter-type">Filter by:</label>
                    <select
                        id="filter-type"
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        className="filter-select"
                    >
                        <option value="name">Name</option>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                        <option value="company.name">Company Name</option>
                        <option value="address.city">City</option>
                        <option value="phone">Phone</option>
                        <option value="website">Website</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="filter-value">Value:</label>
                    <input
                        id="filter-value"
                        type="text"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        placeholder="Enter filter value..."
                        className="filter-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserFilter;