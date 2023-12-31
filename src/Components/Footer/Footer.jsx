import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_API_AUTH_URL}/api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response.data;

        // Set the user state from API data
        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If token is not valid
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return;
          }

          alert(error?.response?.data?.message);
          return;
        }

        alert(error?.message);
      }
    };

    getMe();
  }, []);

  return (
    <>
      {user && (
        <Container fluid="0" style={{ marginTop: "100px" }}>
          <hr />
          <Container>
            <Row className="m-4 p-4 d-flex justify-content-center align-items-start">
              <Col xs={12} md={3}>
                <Link style={{ fontSize: "26px", marginRight: "30px" }}>
                  <BsFacebook color="black" />
                </Link>
                <Link style={{ fontSize: "26px", marginRight: "30px" }}>
                  <BsInstagram color="black" />
                </Link>
                <Link style={{ fontSize: "26px" }}>
                  <BsTwitter color="black" />
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Audio Description</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Investor Relations</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Illegal Information</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Service Code</p>
                </Link>
              </Col>
              <Col xs={12} md={3}>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Help Center</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Job Vacancy</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Cookie Preferences</p>
                </Link>
              </Col>
              <Col xs={12} md={3}>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Gift Card</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Terms of Use</p>
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <p>Company Information</p>
                </Link>
              </Col>
              <Col xs={12} md={3}>
                <p
                  style={{
                    color: "black",
                    fontSize: "12px",
                    textAlign: "end",
                  }}
                >
                  @ Copyrigth by Team 4 2023
                </p>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
}

export default Footer;
