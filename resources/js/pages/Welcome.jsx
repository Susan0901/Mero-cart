import { useAuth } from "../context/AuthContext";
import HomeLayout from "../layout/HomeLayout";

export default function Welcome() {
    const {user, logout} = useAuth();
    console.log(user)
    return (
       <HomeLayout>
        {user ? <div>
            <p>{user?.name} ({user?.role.name})</p>
            <button onClick={logout}>Logout</button>
        </div> : 'Guest'}
       </HomeLayout>
    )
}
