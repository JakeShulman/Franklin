import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Form, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navigation from "./Navigation"
import { getDatabase, ref, set ,get, child  } from "firebase/database";
import {db} from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [titles, setTitle] = useState([])

  useEffect(() => {
    get(child(ref(db), `users/${currentUser.uid}/articles/`)).then((snapshot) => {
      const vals = snapshot.val();
      console.log(vals)
      const titles = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val().title;
        titles.push(childData);
      });
      setTitle(titles);
    });
  }, []);
  async function get_titles(){
    console.log('here')
    .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())
      var titles = [];
      snapshot.forEach((childSnapshot) => {
        titles.push(childSnapshot.val().title);
      });
      return titles

    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
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
            //create article object
            const article = {
              title: e.target.title.value,
              content: e.target.article.value,
            }
            writeUserArticle(currentUser, article)
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
            <h2 className="text-center mb-4">Or continue where you left off</h2>
              <Form.Select className="form-control">
                <option>Select an Article</option>
                {titles ? titles.map((title, index) => <option>{title}</option>): ''}

              </Form.Select> 
            </div>
            <div className="form-group">
              <div className="text-center">
                <br/>
              <Button type="submit" className="signup">
                <span className="text-white"> <b>Submit</b></span>
                </Button>
              </div>
            </div>
          </form>
        </Card.Body>
        </Card>
      
          <div className="row">
            {/*Article */}
            <div className="col-md-6">
            <h2 className="text-center mb-4">Article</h2>
            <Card>
                <Card.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              </Card.Body>
            </Card>
            </div>
            {/*Notes*/}
            <div className="col-md-6">
            <h2 className="text-center mb-4">Notes</h2>
                <form>
            <div className="form-group">
              <textarea
                  rows="5"
                className="form-control"
                id="content" 
                placeholder="Enter content"
              />
            </div>
              </form>
            </div>
          </div>
          </Container>    
      </>

  )
}