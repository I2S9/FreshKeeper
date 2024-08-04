"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'; 
import { fetchRecipes } from "../api/recipeApi";

interface Recipe {
    id: number;
    title: string;
    sourceUrl: string;
}

const PantryPage = () => {
    const [items, setItems] = useState([
      { id: 1, name: 'Apples', quantity: 5, expiryDate: '2024-09-01' },
      { id: 2, name: 'Bananas', quantity: 3, expiryDate: '2024-08-15' },
      { id: 3, name: 'Carrots', quantity: 7, expiryDate: '2024-10-10' },
      { id: 4, name: 'Potatoes', quantity: 10, expiryDate: '2024-11-01' },
      { id: 5, name: 'Tomatoes', quantity: 8, expiryDate: '2024-12-01' },
      { id: 6, name: 'Onions', quantity: 6, expiryDate: '2024-09-15' },
    ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemExpiryDate, setNewItemExpiryDate] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]); //NEW

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

    const today = new Date().toISOString().split('T')[0];
    const router = useRouter();

    const generateRecipes = async () => {
        const ingredients = items.map(item => item.name);
        const fetchedRecipes = await fetchRecipes(ingredients);
        console.log('Fetched Recipes:', fetchedRecipes);
        setRecipes(fetchedRecipes);
    };

    return (
        <div className="container mx-auto py-12">
            <Button
                onClick={() => router.push('/')}
                className="absolute top-4 left-4"
            >
                Home
            </Button>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-6">Welcome to the Pantry</h1>
                <p className="text-lg mb-4">This is the Pantry page. Here you can manage and view your pantry items.</p>
            </div>
            <div className="flex justify-center flex-col gap-12">
                <div className="bg-gray-800 text-white rounded-lg p-8">
                    <Input
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                        className="mb-6"
                    />
                    {showAddForm && (
                        <div className="border rounded-lg bg-gray-800 p-6 mb-12">
                            <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
                            <Input
                                placeholder="Item Name"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                disabled
                                className="mb-4"
                            />
                            <Input
                                type="number"
                                placeholder="Quantity"
                                value={newItemQuantity}
                                onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                                className="mb-4"
                            />
                            <Input
                                type="date"
                                placeholder="Expiration Date"
                                value={newItemExpiryDate}
                                onChange={(e) => {
                                    if (e.target.value >= today) {
                                        setNewItemExpiryDate(e.target.value);
                                    } else {
                                        alert("Expiration date cannot be in the past.");
                                    }
                                }}
                                min={today}
                                className="mb-6"
                            />
                            <Button
                                onClick={handleAddItem}
                                className="bg-blue-600"
                            >
                                Add Item
                            </Button>
                        </div>
                    )}
                    <div className="max-h-[600px] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item) => (
                                <div key={item.id} className="border p-6 rounded-lg bg-gray-800 text-white">
                                    <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                                    <p className="text-lg mb-2">Quantity: {item.quantity}</p>
                                    <p className="text-lg mb-4">Expiration Date: {item.expiryDate}</p>
                                    <div className="flex justify-between mt-4">
                                        <Button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="bg-red-500"
                                        >
                                            Decrease Quantity
                                        </Button>
                                        <Button
                                            onClick={() => handleIncreaseQuantity(item.id)}
                                            className="bg-blue-500"
                                        >
                                            Increase Quantity
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center mt-12">
                        <Button
                            className="bg-blue-600"
                            onClick={generateRecipes}
                        >
                            Generate a Recipe
                        </Button>
                    </div>
                    {recipes.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Recipes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recipes.map((recipe) => (
                                    <div key={recipe.id} className="border p-6 rounded-lg bg-gray-800 text-white">
                                        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                                        <a
                                            href={recipe.sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline"
                                        >
                                            View Recipe
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PantryPage;