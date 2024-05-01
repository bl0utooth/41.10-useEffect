import React, { useState } from 'react';
import axios from 'axios';

const DeckOfCards = () => {
    const [deckId, setDeckId] = useState('');
    const [cards, setCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    const createDeck = async () => {
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(response.data.deck_id);
            setCards([]);
        } catch (error) {
            console.error("Error creating new deck:", error);
        }
    };

    const drawCards = async () => {
        if (!deckId) {
            alert("Please create a deck first!");
            return;
        }
        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
            setCards(response.data.cards);
        } catch (error) {
            console.error("Error drawing cards:", error);
        }
    };

    const shuffleDeck = async () => {
        if (!deckId) {
            alert("Please create a deck first!");
            return;
        }
        setIsShuffling(true);
        try {
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setCards([]);
        } catch (error) {
            console.error("Error shuffling the deck:", error);
        }
        setIsShuffling(false);
    };

    return (
        <div>
            <h1>Deck of Cards</h1>
            <button onClick={createDeck}>Create Deck</button>
            <button onClick={drawCards} disabled={!deckId || isShuffling}>Draw Cards</button>
            <button onClick={shuffleDeck} disabled={!deckId || isShuffling}>Shuffle Deck</button>
            {cards.length === 0 && <p>No cards displayed.</p>}
            {cards.map(card => (
                <div key={card.code}>
                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                    <p>{card.value} of {card.suit}</p>
                </div>
            ))}
        </div>
    );
};

export default DeckOfCards;