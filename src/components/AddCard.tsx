import React, { useState } from "react";

interface AddCardProps {
  toAddList?: boolean;
  handleSubmit?: any;
}

const AddCard: React.FC<AddCardProps> = ({
  handleSubmit,
  toAddList = false,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [cardData, setCardData] = useState("");
  return (
    <div className="add-card">
      {isOpen ? (
        <div
          className={`card-content ${
            toAddList ? "list-content card-container" : ""
          }`}
        >
          {toAddList ? (
            <input
              autoFocus={true}
              placeholder="Enter list title..."
              value={cardData}
              onChange={(e) => setCardData(e.target.value)}
            />
          ) : (
            <textarea
              autoFocus={true}
              rows={3}
              placeholder="Enter a title for this card"
              value={cardData}
              onChange={(e) => setCardData(e.target.value)}
            ></textarea>
          )}
          <div className="cta">
            <button
              onClick={() => {
                if (cardData.length) {
                  setCardData("");
                  handleSubmit(cardData);
                }
              }}
            >
              {toAddList ? "Add List" : "Add Card"}
            </button>
            <img
              src="./images/cross.png"
              alt=""
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      ) : (
        <div
          className={`label ${toAddList ? "list-label" : ""}`}
          onClick={() => setOpen(true)}
        >
          <img src="./images/plus.png" alt="" />
          <p className="card-label">
            {toAddList ? "Add another list" : "Add a card"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddCard;
