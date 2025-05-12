import { User } from '../../models/User.ts';
import './UserCard.scss';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="user-card">
            <div className="user-card__header">
                <h2>{user.name}</h2>
                <p className="username">@{user.username}</p>
            </div>
            <div className="user-card__content">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
                <div className="user-card__address">
                    <p><strong>Address:</strong></p>
                    <p>{user.getFullAddress()}</p>
                </div>
                <div className="user-card__company">
                    <p><strong>Company:</strong></p>
                    <p>{user.getCompanyInfo()}</p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;