import { User } from '../models/User';
import { IUserData } from '../types';

export class UserService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getUsers(): Promise<User[]> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json() as IUserData[];
            return data.map(userData => new User(userData));
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
}