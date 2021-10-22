import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = () => {
  return (
            <>
  {/* <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <br /> */}
  {/* <Navbar bg="primary" fixed="top" variant="light">
    <Container >
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar> */}

  <br />
  <Navbar bg="light" fixed="top" variant="light">
    <Navbar.Brand href="/"><strong>Frankly Writing</strong></Navbar.Brand>
    <Nav className="me-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link> */}
      {/* <Nav.Link href="#features">Features</Nav.Link> */}
    </Nav>
      <Nav.Link href="/signup">
      <Button href='/signup' style= {{backgroundColor: '#228D57'}}> 
      <div style={{color: 'white'}}>Sign up</div>     
       </Button> 
    </Nav.Link>

    <Nav.Link  style = {{paddingRight: '30px'}}href="/login">
      <Button style= {{backgroundColor: 'white'}}> 
      <div style={{color: '#228D57'}}>Log in </div>     
       </Button> 
    </Nav.Link>
  </Navbar>
</>
        );
    }


export default Navigation;