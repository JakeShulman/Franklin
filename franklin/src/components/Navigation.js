import React, { useState } from "react"
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Navigation = () => {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }
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
    <Nav.Link href="/dashboard">
      <div className = 'navbarlink' style={{color: 'black', fontSize:'18px', paddingRight:'20px'}}>Start Wrtiting</div>     
      </Nav.Link>
      <Nav.Link href="#/how-it-works">
      <div className = 'navbarlink' style={{color: 'black', fontSize:'18px'}}>How it Works</div>     
      </Nav.Link>
    </Nav>

   {(!currentUser || currentUser.login) && <Nav.Link href="/login">
      <div className = 'navbarlink' style={{color: 'black', fontWeight:'700', fontSize:'18px'}}>Log in </div>     
    </Nav.Link>
  }

{ (!currentUser || currentUser.login) &&  <Nav.Link href="/signup" style = {{ paddingRight: '30px'}}>
      <Button  className='signup' href='/signup' > 
      <div style={{color: 'black', fontWeight:'700', fontSize:'18px'}}>Sign up</div>     
       </Button> 
    </Nav.Link>
}

{(currentUser && !currentUser.login) && <Nav.Link href="/profile">
      <div className = 'navbarlink' style={{color: 'black', fontWeight:'700', fontSize:'18px'}}>{currentUser.email}</div>     
    </Nav.Link>
}

{(currentUser && !currentUser.login) && 
     <Nav.Link href="/" style = {{ paddingRight: '30px'}}>
      <Button onClick={handleLogout} className='logout' href='/' > 
      <div style={{color: 'white', fontWeight:'700', fontSize:'18px'}}>Log out</div>     
       </Button> 
    </Nav.Link>
}
  </Navbar>
  
</>
        );
    }


export default Navigation;