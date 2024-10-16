import React, { createContext, useEffect, useReducer } from "react";
import { cartInitialState, cartReducer } from "../reducers/cartReducer";
import { recordsInitialState, recordsReducer } from "../reducers/recordReducer";
import { usersInitialState, usersReducer } from "../reducers/userReducer";
import { getMyData } from "../api/usersApi";
import { getCartData } from "../api/cartsApi";
import { getAllRecords } from "../api/recordsApi";
import { setAxiosDefaults } from "../utils/axiosConfig";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cartsState, cartsDispatch] = useReducer(cartReducer, cartInitialState);

  const [recordsState, recordsDispatch] = useReducer(
    recordsReducer,
    recordsInitialState
  );

  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  const { user, isUserLoggedIn } = usersState;

  useEffect(() => {
    setAxiosDefaults();
    getAllRecords(recordsDispatch);
    getMyData(usersDispatch);
  }, []);

  useEffect(() => {
    if (user.cartId) {
      getCartData(cartsDispatch, user.cartId);
    }
  }, [isUserLoggedIn, user.cartId]);

  return (
    <DataContext.Provider
      value={{
        cartsState,
        cartsDispatch,
        recordsState,
        recordsDispatch,
        usersState,
        usersDispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
