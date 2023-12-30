import { createContext, useContext, useReducer } from "react";

const UserAuth = createContext();

const initialState = {
  user: null,
  isLogged: false,
  isInvalid: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "logging":
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        isInvalid: false,
      };
    case "logOut":
      return { ...state, user: null, isLogged: false };
    case "invalid":
      return { ...state, isInvalid: true };
    default:
      throw new Error("Unknown Action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function UserAuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isLogged, isInvalid } = state;

  function loggingAccount(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "logging", payload: FAKE_USER });
    } else {
      dispatch({ type: "invalid" });
    }
  }

  function logOut() {
    dispatch({ type: "logOut" });
  }

  return (
    <UserAuth.Provider
      value={{ user, isLogged, loggingAccount, logOut, isInvalid }}
    >
      {children}
    </UserAuth.Provider>
  );
}

function useAuth() {
  const context = useContext(UserAuth);
  if (context === undefined) {
    throw new Error(
      "The hook has used outside of the User Authentication Provider"
    );
  }
  return context;
}

export { UserAuthProvider, useAuth };
