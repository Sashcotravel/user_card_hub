import { IUserData, IAddress, ICompany } from '../types';

export class User implements IUserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;

    constructor(userData: IUserData) {
        this.id = userData.id;
        this.name = userData.name;
        this.username = userData.username;
        this.email = userData.email;
        this.address = userData.address;
        this.phone = userData.phone;
        this.website = userData.website;
        this.company = userData.company;
    }

    getFullAddress(): string {
        const { street, suite, city, zipcode } = this.address;
        return `${street}, ${suite}, ${city}, ${zipcode}`;
    }

    getCompanyInfo(): string {
        return `${this.company.name} - ${this.company.catchPhrase}`;
    }
}