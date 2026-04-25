import { createContext, useState } from "react";

export const UserContext = createContext()

function UserProvider({ children }){
    const [loggedInUser, setLoggedInUser] = useState('');

    return(
        <UserContext.Provider value={ [ loggedInUser, setLoggedInUser ] }>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;