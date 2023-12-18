import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`/api/orders`)
      .then((response) => response.json())
      .then((data) => setOrders(data));

    fetch(`/api/transactions`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  // Obtener el resumen de las transacciones
  const getTransactionsResume = () => {
    const result = transactions.reduce((total, transaction) => {
      const valor =
        transaction.type === 'entrada' ? transaction.price : -transaction.price;
      return total + Number(valor);
    }, 0);

    return Number(result);
  };

  // Obtener el resumen de las transacciones
  const getSavings = () => {
    const result = transactions.reduce((total, transaction) => {
      const valor = transaction.type === 'reserva' ? transaction.price : 0;
      return total + valor;
    }, 0);

    return Number(result);
  };

  const ordersFinishes = orders?.filter(
    (item) => item.status === 'terminado'
  ).length;

  const ordersInProcess = orders?.filter(
    (item) => item.status === 'proceso'
  ).length;

  const total = getTransactionsResume();
  const savings = getSavings();

  const contextValue = {
    orders: orders,
    totalOrders: orders.length,
    setOrders,
    transactions,
    setTransactions,
    transactionsResume: total,
    transactionsSavings: savings,
    ordersFinishes,
    ordersInProcess
    // Agrega otros valores o funciones globales según sea necesario
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
