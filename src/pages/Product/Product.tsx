import React, { useEffect, useState } from "react";
import "./Product.css";
import { ProductType } from "../../models/productType";
import { Button, Carousel} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/services";
import { BackwardOutlined, PhoneOutlined } from "@ant-design/icons";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
    const navigate = useNavigate()
  useEffect(() => {
    const handleProduct = async () => {
      if (id) {
        try {
          const productAPI = await getProductById(id);

          setProduct(productAPI);
        } catch (error) {
          console.error("Error in handleProduct:", error);
        }
      }
    };
    handleProduct();
  }, [id]);

  const handleContact = () => {
    navigate(`/contact/${id}`)
  }
  const handleBack = () => {
    navigate("/")
  }
  return (
    <div className="details-container">
      <Button type="primary" size="large" onClick={handleBack} icon={<BackwardOutlined/>}>Go Back</Button>
      {product && (
        <div className="content-box">
          <div className="carousel-style">
            <Carousel autoplay autoplaySpeed={2000}>
              <div className="image-box">
                <img className='product-image' alt="item-img" src={product.images[0]} />
              </div>
              <div className="image-box">
                <img className='product-image' alt="item-img" src={product.images[1]} />
              </div>
              <div className="image-box">
                <img className='product-image' alt="item-img" src={product.images[2]} />
              </div>
            </Carousel>
          </div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>€{product.price}</h2>
          <div className="button-container">
          <Button type="primary" style={{width:180}} size="large" onClick={handleContact} icon={<PhoneOutlined/>}>Contact Us!</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
