import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CardSorting = () => {
  const [cards, setCards] = useState([
    { id: uuidv4(), content: 'Card 1' },
    { id: uuidv4(), content: 'Card 2' },
    { id: uuidv4(), content: 'Card 3' },
    { id: uuidv4(), content: 'Card 4' },
  ]);

  const [categories, setCategories] = useState([
    { id: uuidv4(), name: 'Category 1', cards: [] },
    { id: uuidv4(), name: 'Category 2', cards: [] },
  ]);

  const handleDrop = (e, categoryId) => {
    const cardId = e.dataTransfer.getData('cardId');
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setCategories(categories.map(category => {
        if (category.id === categoryId) {
          return { ...category, cards: [...category.cards, card] };
        }
        return category;
      }));
      setCards(cards.filter(c => c.id !== cardId));
    }
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Card Sorting Exercise</h1>
      <div className="flex space-x-4 mb-4">
        {cards.map(card => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card.id)}
            className="p-4 bg-white rounded shadow cursor-pointer"
          >
            {card.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        {categories.map(category => (
          <div
            key={category.id}
            onDrop={(e) => handleDrop(e, category.id)}
            onDragOver={(e) => e.preventDefault()}
            className="w-64 bg-white p-4 rounded shadow"
          >
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            {category.cards.map(card => (
              <div key={card.id} className="p-2 bg-gray-200 rounded mb-2">
                {card.content}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSorting;