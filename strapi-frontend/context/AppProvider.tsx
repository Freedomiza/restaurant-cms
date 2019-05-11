import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ICart } from '../interfaces/Cart';

type AppContextProps = {
  items: ICart[],
  total: number,
  addItem?: Function,
  removeItem?: Function,
};

export const AppContext = createContext<AppContextProps>({
  items: [],
  total: 0,
});

type Props = {
  children: React.ReactNode | React.ReactNodeArray,
};

export const AppProvider: React.FunctionComponent<Props> = ({ children }: Props) => {

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(null);

  const addItem = (item: ICart) => {
    // heck for item already in cart
    // if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i: ICart) => i.id === item.id);
    let newItems = [...items];
    if (!newItem) {
      // set quantity property to 1
      item.quantity = 1;
      newItems = [...newItems.concat(item)];
    } else {
      newItems = newItems.map(
        (item: ICart) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item,
      );
    }

    setItems(newItems);
    setTotal(total + item.price);
    Cookies.set('cart', newItems);
  };

  const removeItem = (item: ICart) => {
    // check for item already in cart
    // if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i: ICart) => i.id === item.id);
    let newItems = [...items];

    if (newItem.quantity > 1) {
      newItems = newItems.map(
        (item: ICart) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity - 1 })
            : item,
      );
    } else {
      const index = newItems.findIndex(i => i._id === newItem._id);
      newItems.splice(index, 1);
    }
    setItems(newItems);
    setTotal(total - item.price);
    Cookies.set('cart', newItems);
  };

  useEffect(() => {
    const cart: ICart[] = Cookies.getJSON('cart');
    let sum = 0;
    if (cart && cart.length > 0) {
      sum = cart.reduce((val: number, item: ICart) => val + item.price * item.quantity, 0);
      setTotal(sum);
      setItems(cart);
    }
  },        []);

  const value: AppContextProps = {
    items,
    total,
    addItem,
    removeItem,
  };
  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
};
