import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Form, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navigation from "./Navigation"
import { ref, set ,get, child  } from "firebase/database";
import {db} from "../firebase";

export default function Upload() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [titles, setTitle] = useState([])
  const [currentArticle, setCurrentArticle] = useState({})
  const [currentContent, setCurrentContent] = useState("")

  function get_titles() {
    get(child(ref(db), `users/${currentUser.uid}/articles/`)).then((snapshot) => {
      const vals = snapshot.val();
      const titles = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val().title;
        titles.push(childData);
      });
      setTitle(titles);
    });
  }

  function get_sentences(content){
    //split the article into sentences by punctuation
    var sentences = content.split(/[.!?]/);
    //strip the white space from the sentences
    sentences = sentences.map(function(sentence){
      return sentence.trim();
    });
    //remove empty strings
    sentences = sentences.filter(function(n){ return n !== "" });
    return sentences;
  }
  useEffect(() => {
    get_titles();
  }, []);

 //make async function to read from firebase database
  async function read_article(title){
    var article = await get(child(ref(db), `users/${currentUser.uid}/articles/${hashCode(title)}`));
    var content = article.val();
    return content;
  }

  async function get_current_article(form_data){
    if(form_data.content){
      var sentences = get_sentences(form_data.content);
      article = {
        title: form_data.title.value,
        content: form_data.article.value,
        sentences: sentences,
        notes: Array(sentences.length).fill("")
      }
      writeUserArticle(currentUser, article)
      return article;
    }
    else if(form_data.selectarticle.value){
      var article = await read_article(form_data.selectarticle.value);
      return article;
    }
  }

  function hashCode(s) {
  var hash = 0, i, chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

  function writeUserArticle(currentUser, article){
    //hash the article title to get a unique key
     const key = hashCode(article.title);
     console.log(currentUser.uid,key);
    set(ref(db, 'users/'+currentUser.uid+'/articles/'+key), article)
  }

  return (
    <>
    <Navigation/>
    {/*Upload Article */}
    <Container style={{ minHeight: "100vh" ,backgroundColor: '#d3e8d1', minWidth:'100vw'}}>
     <Card style={{backgroundColor: '#d3e8d1', border: 'none'}}>
        <Card.Body>
        <br></br>
          <h2 className="text-center mb-4">Upload a New Article</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            get_titles();
            get_current_article(e.target).then(response =>{
              history.push({
                pathname: '/write',
                state: { article: response }
                })
            })
            

          }}>
            <div className="form-group">
              <input type="text" className="form-control" id="title" placeholder="Title" />
            </div>
            <div className="form-group">
            <br/>
              <textarea className="form-control" id="article" rows="3" placeholder="Article"></textarea>
            </div>
            <div className="form-group">
              <br/>
            <h2 className="text-center mb-4">Or Continue Where You Left Off</h2>
              <Form.Select className="form-control" id='selectarticle'>
                <option>Select an Article</option>
                {titles ? titles.map((title, index) => <option key={index}>{title}</option>): ''}
              </Form.Select> 
            </div>
            <div className="form-group">
              <div className="text-center">
                <br/>
              <Button type="submit" className="submitbutton">
                <span className="text-white"> <b>Submit</b></span>
                </Button>
              </div>
            </div>
          </form>
        </Card.Body>
        </Card>
          </Container>    
      </>

  )
}