import { Avatar, Button, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { contactType } from "../../models/contactType";
import { useNavigate, useParams } from "react-router-dom";
import { getContactById } from "../../services/services";
import { BackwardOutlined } from "@ant-design/icons";

const Contact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<contactType | null>(null);
  const navigate = useNavigate()
  useEffect(() => {
    const handleProduct = async () => {
      if (id) {
        try {
          const contactAPI = await getContactById(id);

          setContact(contactAPI);
        } catch (error) {
          console.error("Error in handleProduct:", error);
        }
      }
    };
    handleProduct();
  }, [id]);
  const handleClick = () => {
    navigate(`/product/${id}`)
  }
  return (
    <div>
        <Button type="primary" size="large" onClick={handleClick} icon={<BackwardOutlined/>}>Go Back</Button>
        {
        contact &&
      <Descriptions title="Contact Info">
       
        <Descriptions.Item label="Image"><Avatar src={contact.image} 
         size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 200, xxl: 200 }}/></Descriptions.Item>
        <Descriptions.Item label="Name">{contact.firstName}</Descriptions.Item>
        <Descriptions.Item label="LastName">{contact.lastName}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{contact.phone}</Descriptions.Item>
        <Descriptions.Item label="Live">{contact.email}</Descriptions.Item>
      </Descriptions>}
    </div>
  );
};

export default Contact;
