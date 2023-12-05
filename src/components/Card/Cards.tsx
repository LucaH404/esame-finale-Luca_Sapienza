import React from "react";
import { Card, Flex } from "antd";
import "./Cards.css";
import { useNavigate } from "react-router-dom";
interface ICards {
  id?: number;
  title: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  handleProduct: (index: number) => void;
}
const Cards: React.FC<ICards> = ({
  title,
  description,
  brand,
  price,
  images,
  id,
  handleProduct
}) => {
  const image = images.map((image) => image);
  const handleClick = () => {
    handleProduct(id || 0);
  };
  return (
    <Flex onClick={handleClick}>
      <div className="card-wrapper">
        <div className="icon-wrapper">
          <img className="card-icon" alt="product-img" src={image[0]} />
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <h4>€{price}</h4>
          <p>{description}</p>
        </div>
      </div>
    </Flex>
  );
};

export default Cards;
