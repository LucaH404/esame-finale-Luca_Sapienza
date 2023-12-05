import { useEffect, useState } from "react";
import "./Home.css";
import {
  ConfigProvider,
  Flex,
  Form,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Select,
} from "antd";
import { ProductType } from "../../models/productType";
import {
  fetchAllProducts,
  getProductByCategory,
  searchProducts,
} from "../../services/services";
import Cards from "../../components/Card/Cards";
import { SearchProps } from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import { categoryOptions } from "../../models/categories";

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const navigate = useNavigate();
  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearchQuery(value);
  };
  const options = categoryOptions.map((category) => ({
    value: category,
    label:
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
  }));
  useEffect(() => {
    const getProducts = async (page: number) => {
      try {
        if (searchQuery) {
          const response = await searchProducts(searchQuery);
          setProducts(response.products);
          setTotalProducts(response.total);
        } else if (selectedCategory) {
          const response = await getProductByCategory(selectedCategory, page);
          setProducts(response.products);
          setTotalProducts(response.total);
        } else {
          const response = await fetchAllProducts(page);
          setProducts(response.products);
          setTotalProducts(response.total);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts(currentPage);
  }, [currentPage, searchQuery, selectedCategory]);

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  const handleProduct = (id: number) => {
    navigate(`/product/${id}`);
  };
  return (
    <ConfigProvider
      theme={{
        components: {},
        token: {},
      }}
    >
      <Row><div>
        <h1>Welcome to SHOPIFY!</h1>
        </div></Row>
      <Row justify="space-evenly">
        <Flex>
          <div className="filter-wrapper">
            <h1>Filtri</h1>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item label="Search" name="searchbar">
                <Search placeholder="Search" onSearch={onSearch} />
              </Form.Item>

              <Form.Item label="Category" name="select">
                <Select
                  placeholder="Select Category"
                  options={options}
                  onChange={handleCategoryChange}
                ></Select>
              </Form.Item>
            </Form>
          </div>
        </Flex>
        <Flex align="center" vertical style={{backgroundColor:"#dddddd"}}>
          <h1>Annunci</h1>
          {products.map((product) => (
            <div className="card-spacer" key={product.id}>
              <Cards
                brand={product.brand}
                description={product.description}
                images={[product.images[0]]}
                price={product.price || 0}
                title={product.title}
                handleProduct={() => handleProduct(product.id)}
              />
            </div>
          ))}
          <Pagination
            defaultCurrent={1}
            total={totalProducts}
            onChange={onChange}
          />
        </Flex>
      </Row>
      <footer className="footer-wrapper">
        <div className="footer-content">
        <p>La tua azienda</p>
        <p>Email: email@example.com</p>
        <p>&copy; 2023 Nome del tuo sito</p></div>
    </footer>
    </ConfigProvider>
  );
};

export default Home;
