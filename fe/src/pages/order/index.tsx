import React from 'react';
import MyOrders from './MyOrders';
const Order:  React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1">
        <MyOrders />
      </main>
    </div>
  );
};

export default Order;
