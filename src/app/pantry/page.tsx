import React from 'react';

const PantryPage = () => {
  const items = [
    { name: 'Apples', quantity: 5 },
    { name: 'Bananas', quantity: 3 },
    { name: 'Carrots', quantity: 7 },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Pantry</h1>
      <p className="text-lg mb-8">
        This is the Pantry page. Here you can manage and view your pantry items.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow-sm">
            <h2 className="text-2xl font-semibold">{item.name}</h2>
            <p className="text-lg">Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantryPage;
