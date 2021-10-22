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
    <Navbar.Brand style= {{paddingRight:'20px'}}href="/"><strong>Frankly Writing</strong></Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#features">
      <div className = 'navbarlink' style={{color: 'black', fontSize:'18px'}}>How it Works</div>     
      </Nav.Link>
    </Nav>

    <Nav.Link href="/login">
      <div className = 'navbarlink' style={{color: 'black', fontWeight:'700', fontSize:'18px'}}>Log in </div>     
    </Nav.Link>

      <Nav.Link href="/signup" style = {{ paddingRight: '30px'}}>
      <Button  className='signup' href='/signup' > 
      <div style={{color: 'black', fontWeight:'700', fontSize:'18px'}}>Sign up</div>     
       </Button> 
    </Nav.Link>
  </Navbar>
</>
        );
    }


export default Navigation;