"use client";

import React, { useState } from 'react';

const PantryPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apples', quantity: 5, expiryDate: '2024-09-01' },
    { id: 2, name: 'Bananas', quantity: 3, expiryDate: '2024-08-15' },
    { id: 3, name: 'Carrots', quantity: 7, expiryDate: '2024-10-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemExpiryDate, setNewItemExpiryDate] = useState('');


  const existingItems = [
    // Fruits
    'apple', 'apples', 'banana', 'bananas', 'cherry', 'cherries', 'date', 'dates', 'fig', 'figs', 'grape', 'grapes', 'kiwi', 'kiwis', 'lemon', 'lemons', 'lime', 'limes', 'mango', 'mangoes', 'orange', 'oranges', 'papaya', 'papayas', 'peach', 'peaches', 'pear', 'pears', 'pineapple', 'pineapples', 'plum', 'plums', 'pomegranate', 'pomegranates', 'raspberry', 'raspberries', 'strawberry', 'strawberries', 'watermelon', 'watermelons', 'blueberry', 'blueberries', 'blackberry', 'blackberries', 'cranberry', 'cranberries', 'grapefruit', 'grapefruits', 'cantaloupe', 'cantaloupes', 'honeydew', 'honeydews', 'nectarine', 'nectarines', 'tangerine', 'tangerines', 'apricot', 'apricots', 'avocado', 'avocados', 'coconut', 'coconuts', 'guava', 'guavas', 'lychee', 'lychees', 'passion fruit', 'passion fruits', 'persimmon', 'persimmons', 'quince', 'quinces', 'rhubarb', 'rhubarbs', 'starfruit', 'starfruits', 'ugli fruit', 'ugli fruits',

    // Vegetables
    'asparagus', 'beet', 'beets', 'broccoli', 'brussels sprout', 'brussels sprouts', 'cabbage', 'cabbages', 'carrot', 'carrots', 'cauliflower', 'cauliflowers', 'celery', 'collard green', 'collard greens', 'corn', 'cucumber', 'cucumbers', 'eggplant', 'eggplants', 'garlic', 'green bean', 'green beans', 'kale', 'leek', 'leeks', 'lettuce', 'lettuces', 'mushroom', 'mushrooms', 'okra', 'onion', 'onions', 'parsnip', 'parsnips', 'pea', 'peas', 'pepper', 'peppers', 'potato', 'potatoes', 'pumpkin', 'pumpkins', 'radish', 'radishes', 'spinach', 'squash', 'sweet potato', 'sweet potatoes', 'tomato', 'tomatoes', 'turnip', 'turnips', 'zucchini', 'zucchinis', 'artichoke', 'artichokes', 'arugula', 'bok choy', 'chard', 'endive', 'escarole', 'fennel', 'jicama', 'kohlrabi', 'radicchio', 'rutabaga', 'rutabagas', 'scallion', 'scallions', 'shallot', 'shallots', 'snow pea', 'snow peas', 'sprout', 'sprouts', 'watercress', 'yam', 'yams',

    // Grains and Legumes
    'barley', 'buckwheat', 'bulgur', 'cornmeal', 'couscous', 'farro', 'freekeh', 'millet', 'oat', 'oats', 'quinoa', 'rice', 'rices', 'rye', 'sorghum', 'spelt', 'teff', 'wheat', 'wild rice', 'black bean', 'black beans', 'black-eyed pea', 'black-eyed peas', 'cannellini bean', 'cannellini beans', 'chickpea', 'chickpeas', 'fava bean', 'fava beans', 'great northern bean', 'great northern beans', 'kidney bean', 'kidney beans', 'lentil', 'lentils', 'lima bean', 'lima beans', 'mung bean', 'mung beans', 'navy bean', 'navy beans', 'pinto bean', 'pinto beans', 'soybean', 'soybeans', 'split pea', 'split peas',

    // Nuts and Seeds
    'almond', 'almonds', 'brazil nut', 'brazil nuts', 'cashew', 'cashews', 'chestnut', 'chestnuts', 'hazelnut', 'hazelnuts', 'macadamia nut', 'macadamia nuts', 'pecan', 'pecans', 'pistachio', 'pistachios', 'walnut', 'walnuts', 'chia seed', 'chia seeds', 'flaxseed', 'flaxseeds', 'hemp seed', 'hemp seeds', 'pumpkin seed', 'pumpkin seeds', 'sesame seed', 'sesame seeds', 'sunflower seed', 'sunflower seeds',

    // Dairy
    'milk', 'milks', 'cheese', 'cheeses', 'butter', 'butters', 'cream', 'creams', 'yogurt', 'yogurts', 'ice cream', 'ice creams', 'sour cream', 'sour creams', 'cottage cheese', 'cottage cheeses', 'cream cheese', 'cream cheeses', 'blue cheese', 'blue cheeses', 'cheddar', 'cheddars', 'mozzarella', 'mozzarellas', 'parmesan', 'parmesans', 'ricotta', 'ricottas', 'feta', 'fetas', 'goat cheese', 'goat cheeses', 'brie', 'bries', 'camembert', 'camemberts', 'gouda', 'goudas', 'provolone', 'provolones', 'swiss cheese', 'swiss cheeses', 'monterey jack', 'monterey jacks', 'pepper jack', 'pepper jacks', 'gruyere', 'gruyeres', 'asiago', 'asiagos', 'romano', 'romanos', 'havarti', 'havartis', 'pimento cheese', 'pimento cheeses', 'queso', 'quesos', 'paneer', 'paneers',

    // Meats
    'bacon', 'bacons', 'beef', 'beefs', 'chicken', 'chickens', 'duck', 'ducks', 'goat', 'goats', 'lamb', 'lambs', 'pork', 'porks', 'rabbit', 'rabbits', 'turkey', 'turkeys', 'venison', 'venisons', 'veal', 'veals',

    // Seafood
    'anchovy', 'anchovies', 'clam', 'clams', 'cod', 'cods', 'crab', 'crabs', 'eel', 'eels', 'flounder', 'flounders', 'haddock', 'haddocks', 'halibut', 'halibuts', 'lobster', 'lobsters', 'mackerel', 'mackerels', 'mussel', 'mussels', 'octopus', 'octopuses', 'oyster', 'oysters', 'salmon', 'salmons', 'sardine', 'sardines', 'scallop', 'scallops', 'shrimp', 'shrimps', 'snapper', 'snappers', 'squid', 'squids', 'tilapia', 'tilapias', 'trout', 'trouts', 'tuna', 'tunas', 'whiting', 'whitings',

    // Sauces and Condiments
    'aioli', 'aiolis', 'barbecue sauce', 'barbecue sauces', 'buffalo sauce', 'buffalo sauces', 'chili sauce', 'chili sauces', 'cocktail sauce', 'cocktail sauces', 'duck sauce', 'duck sauces', 'fish sauce', 'fish sauces', 'hoisin sauce', 'hoisin sauces', 'hot sauce', 'hot sauces', 'ketchup', 'ketchups', 'mayonnaise', 'mayonnaises', 'mustard', 'mustards', 'pesto', 'pestos', 'ranch dressing', 'ranch dressings', 'relish', 'relishes', 'salsa', 'salsas', 'soy sauce', 'soy sauces', 'tabasco', 'tabascos', 'tartar sauce', 'tartar sauces', 'teriyaki sauce', 'teriyaki sauces', 'tzatziki', 'tzatzikis', 'vinaigrette', 'vinaigrettes', 'worcestershire sauce', 'worcestershire sauces', 'alfredo sauce', 'alfredo sauces', 'bechamel', 'bechamels', 'bernaise', 'bernaises', 'demi-glace', 'demi-glaces', 'hollandaise', 'hollandaises', 'marinara', 'marinaras', 'mole', 'moles', 'romesco', 'romescoes',

    // Beverages
    'water', 'mineral water', 'sparkling water', 'cola', 'diet cola', 'lemon-lime soda', 'root beer', 'ginger ale', 'tonic water', 'club soda', 'orange juice', 'apple juice', 'cranberry juice', 'grapefruit juice', 'lemonade', 'limeade', 'iced tea', 'sweet tea', 'green tea', 'black tea', 'chai tea', 'coffee', 'espresso', 'latte', 'cappuccino', 'hot chocolate', 'milkshake', 'smoothie', 'beer', 'cider', 'wine', 'champagne', 'vodka', 'gin', 'rum', 'tequila', 'whiskey', 'brandy', 'liqueur', 'cocktail'
  ];
  const handleAddItem = () => {
    const existingItem = items.find(item => item.name.toLowerCase() === newItemName.toLowerCase());
    if (existingItem) {
      const updatedItems = items.map(item => 
        item.id === existingItem.id 
          ? { ...item, quantity: item.quantity + newItemQuantity } 
          : item
      );
      setItems(updatedItems);
    } else {
      const newItem = {
        id: items.length + 1,
        name: newItemName,
        quantity: newItemQuantity,
        expiryDate: newItemExpiryDate,
      };
      setItems([...items, newItem]);
    }
    setShowAddForm(false);
    setNewItemName('');
    setNewItemQuantity(1);
    setNewItemExpiryDate('');
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = items.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ).filter(item => item.quantity > 0);
    setItems(updatedItems);
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedItems = items.map(item =>
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
    setItems(updatedItems);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const existingItem = items.find(item => item.name.toLowerCase() === searchTerm.toLowerCase());
      if (!existingItem && existingItems.includes(searchTerm.toLowerCase())) {
        setNewItemName(searchTerm);
        setShowAddForm(true);
      } else {
        alert("The item does not exist or is misspelled.");
      }
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto py-8">
      <button
        onClick={() => window.location.href = '/'} // Redirige vers la page d'accueil
        className="absolute top-4 left-4 text-white p-2"
      >
        Home
      </button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to the Pantry</h1>
        <p className="text-lg text-white">
          This is the Pantry page. Here you can manage and view your pantry items.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-[#35393F] text-white rounded-lg p-8">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            className="w-full p-2 mb-8 border rounded-lg bg-white text-black"
            style={{ backgroundColor: '#35393F', color: '#FFFFFF' }}
          />
          {showAddForm && (
            <div className="mb-8 border rounded-lg bg-[#35393F] p-4">
              <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
              <input
                type="text"
                placeholder="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg bg-[#35393F] text-white"
                disabled
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                className="w-full p-2 mb-4 border rounded-lg bg-[#35393F] text-white"
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={newItemExpiryDate}
                onChange={(e) => {
                  // Validate expiry date
                  if (e.target.value >= today) {
                    setNewItemExpiryDate(e.target.value);
                  } else {
                    alert("Expiry date cannot be in the past.");
                  }
                }}
                min={today} // Set the minimum date to today
                className="w-full p-2 mb-4 border rounded-lg bg-[#35393F] text-white"
              />
              <button
                onClick={handleAddItem}
                className="bg-[#004BE0] text-white p-2 rounded-lg"
              >
                Add Item
              </button>
            </div>
          )}
          <div className="max-h-[500px] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg shadow-sm bg-[#35393F] text-white">
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                  <p className="text-lg">Quantity: {item.quantity}</p>
                  <p className="text-lg">Expiry Date: {item.expiryDate}</p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white p-2 rounded-lg"
                    >
                      Decrease Quantity
                    </button>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                      Increase Quantity
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button className="bg-[#004BE0] text-white p-4 rounded-lg">Generate a Recipe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryPage;