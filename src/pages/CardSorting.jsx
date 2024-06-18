import React, { useState } from 'react';

const CardSorting = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1', cards: [] },
    { id: 2, name: 'Category 2', cards: [] },
  ]);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  const handleDrop = (e, category) => {
    const card = JSON.parse(e.dataTransfer.getData('card'));
    setCategories(categories.map(cat => {
      if (cat.id === category.id) {
        return { ...cat, cards: [...cat.cards, card] };
      }
      return cat;
    }));
    setCards(cards.filter(c => c.id !== card.id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Card Sorting Exercise</h1>
      <div className="flex space-x-4 mb-4">
        {cards.map(card => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
            className="p-4 bg-white rounded shadow cursor-pointer"
          >
            {card.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        {categories.map(category => (
          <div
            key={category.id}
            onDrop={(e) => handleDrop(e, category)}
            onDragOver={handleDragOver}
            className="w-64 bg-white p-4 rounded shadow"
          >
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            {category.cards.map(card => (
              <div key={card.id} className="p-2 bg-gray-200 rounded mb-2">
                {card.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSorting;