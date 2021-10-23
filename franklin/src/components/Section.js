import { Row, Col,  Container, Button } from 'react-bootstrap';
import Image from '../imgs/frank_oval_loop.gif'
import Sig from '../imgs/sig.png'

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
    <Row style = {{height: '80%', paddingTop:'5%'}}>
      <Col style = {{height: '100%'}} md={2}/>
        <Col  style = {{height: '100%'}} md={4}>  
        <h1>Learn How to Write </h1>
        <h6>"I thought the writing excellent, and wished, if possible, to imitate it. 
          With this view I took some of the papers, and making short hints of the sentiment in each sentence, 
          laid them by a few days, and then, without looking at the book, tried to complete the papers again, 
          by expressing each hinted sentiment at length, and as fully as it had been expressed before, in any 
          suitable words that should come to hand. Then I compared my " Spectator" with the original, discovered 
          some of my faults, and corrected them. But I found I wanted a stock of words, or a readiness in recollecting
          and using them, which I thought I should have acquired before that time if I had gone on making verses; since 
          the continual occasion for words of the same import, but of different length, to suit the measure, or of
          different sound for the rhyme, would have laid me under a constant necessity of searching for variety in 
          my mind and also have tended to fix that variety in my mind and make me master of it. Therefore I took some of 
          the tales and turned them into verse; and, after a time, when I had pretty well forgotten the prose, turned them 
          back again. I also sometimes jumbled my collections of hints into confusion, and after some weeks endeavored to 
          reduce them into the best order, before I began to form the full sentences and complete the paper. This was to teach
          me method in the arrangement of thoughts. By comparing my work afterwards with the origional, I discovered many 
          faults and amended them; but I sometimes had the pleasure of fancying that, in certain particilars of small 
          import, I had been lucky enough to improve the method or the language, and this encouraged me to think I might 
          possibly in time come to be a torable English writer, of which I was extremely ambitious."
        </h6>
        
        <img className="d-block img-fluid mx-auto" style = {{height: '30%', justifyContent:'right'}}src={Sig}/>
        </Col>
        <Col md={1}/>
        <Col style = {{height: '100%'}} md = {4}>  
        <img style = {{height: '100%'}}src={Image}/>
        </Col>
  </Row>
      </Container>
          </>
        );
    }


export default Section;