import React from 'react';
import { useState, useEffect } from 'react';
import './Card.css';

const Card = () => {

    const [presentCard, setPresentCard] = useState([]);
    const [drawnCard, setDrawnCard] = useState([]);
    const [error, setError] = useState(false);

    const initializeDeck = () => {
        const suits = ['♣️', '❤️', '♦️', '♠️'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        const cards = [];
        suits.forEach((item) => {
            values.forEach((val) => {
                cards.push(`${item},${val}`)
            });
        });
        setPresentCard(cards); 
    }

    useEffect(() => {
        initializeDeck();
    }, [])

    const handleDrawCard = () => { 
        if (presentCard.length === 0) {
            setError(true);
        } else {
            let updatedDrawnCards = [];
            let deckLength = presentCard.length === 2 ? 2 : 5;
            for (let i=0; i<deckLength; i++) {
                let randomIndex = Math.floor(Math.random()*presentCard.length);
                updatedDrawnCards.push(presentCard[randomIndex]);
                presentCard.splice(randomIndex, 1);
            } 
            setDrawnCard([ updatedDrawnCards, ...drawnCard]);
        }     
    } 

    const renderCards = () => { 
        return (
            <div>
                {
                    drawnCard.map((cardList) => { 
                        return (
                            <div className='card_list_wrapper'>
                                {
                                    cardList.map((c) => {
                                        const [suit, val] = c.split(','); 
                                        return <div className='card_container'>
                                            <span className='val'>{val}</span>
                                            <span className={`${suit === '♦️' ? 'color_red' : ''} suit`}>{suit}</span>
                                            </div>
                                    }) 
                                }
                            </div>    
                        ) 
                    }) 
                }
            </div>
        )  
        
    }

    return (
        <> 
            <div onClick={handleDrawCard} className='draw_card_button'>Draw Card</div> 
            {error && <div className='error_message'>No more card is present in the deck...! </div>}
            {renderCards()}
        </>
    )
}

export default Card