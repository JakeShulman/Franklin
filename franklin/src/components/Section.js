import { Row, Col,  Container, Button } from 'react-bootstrap';
import Image from '../imgs/Franklin.jpeg'

const Section = (props) => {
  return (
          <>
          <Container fluid
        style={{
        //   backgroundImage: `url(${Image})`,
        //   backgroundRepeat: 'no-repeat',
          backgroundColor: props.color,
          height: props.height
        }}>
    <br></br>
    <Row>
        <Col>  
        <h1>Learn How to Write</h1>
        </Col>
  </Row>
      </Container>
          </>
        );
    }


export default Section;