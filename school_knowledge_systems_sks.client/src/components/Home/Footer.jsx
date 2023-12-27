import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-2 mt-auto">
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h3>Contact Us</h3>
                            <p>Email: info@example.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h3>Follow Us</h3>
                            <p>Facebook</p>
                            <p>Twitter</p>
                            <p>Instagram</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
