import ViewPost from "../Socialmedia/viewPost";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    handleCardClick,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    handleCardClick: (card: any) => void; // Added click handler for card

  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => handleCardClick(card)}
      className={cn(
        "rounded relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-[300px] w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
      src={card.images?.[0]} // Use the first image if available
      alt={card.description}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.description}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

 type Card = {
_id:string;
comments:number;
createdAt:string;
descriptipn:string;
image:string[];
likes:number
};

export function FocusCards({ cards,userId,setPostData }: { cards: Card[],userId:string,setPostData}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // State for selected card
  const [isViewPostOpen, setViewPostOpen] = useState<boolean>(false);  // Modal open state

  const handleCardClick = (card: Card) => {
    setSelectedCard(card); // Set the clicked card as selected
    setViewPostOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setViewPostOpen(false); // Close the modal
    setSelectedCard(null); // Clear the selected card
  };

  if (!cards || !Array.isArray(cards)) {
    return <div>No cards available</div>;
  }

  if (cards.length === 0) {
    return <div>No cards to display</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
        {cards.map((card, index) => (
          <Card
            key={card._id}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            handleCardClick={handleCardClick} // Pass the handler for card click
          />
        ))}
      </div>

      {selectedCard && (
        <ViewPost 
          isOpen={isViewPostOpen} 
          onClose={handleCloseModal} 
          card={selectedCard} // Pass selected card details to the modal
          userId={userId}
          setSelectedCard={setSelectedCard}
          setPostData={setPostData}
        />
      )}
    </>
  );
}
