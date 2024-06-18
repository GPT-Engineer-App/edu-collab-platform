import React, { useState } from 'react';

const CardSorting = () => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const addCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, { id: categories.length + 1, name: newCategory, cards: [] }]);
      setNewCategory('');
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCategoryDrop = (category) => {
    if (selectedCard) {
      setCategories(categories.map(cat => {
        if (cat.id === category.id) {
          return { ...cat, cards: [...cat.cards, selectedCard] };
        }
        return cat;
      }));
      setCards(cards.filter(card => card.id !== selectedCard.id));
      setSelectedCard(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Card Sorting Exercise</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Add a new category"
          />
          <button onClick={addCategory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Category
          </button>
        </div>
        <div className="flex space-x-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="w-1/3 bg-gray-200 p-4 rounded"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleCategoryDrop(category)}
            >
              <h3 className="text-lg font-bold mb-2">{category.name}</h3>
              {category.cards.map(card => (
                <div key={card.id} className="p-2 bg-gray-300 rounded mb-2">
                  {card.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Cards</h2>
        <div className="flex space-x-4">
          {cards.map(card => (
            <div
              key={card.id}
              className="p-4 bg-gray-200 rounded cursor-pointer"
              draggable
              onDragStart={() => handleCardClick(card)}
            >
              {card.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSorting;