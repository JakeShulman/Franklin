import {Container, Card} from 'react-bootstrap'
import Navigation from "./Navigation"
import { Link, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { ref, set ,get, update  } from "firebase/database";
import {db} from "../firebase";
import { useAuth } from "../contexts/AuthContext"

function writeUserArticle(currentUser, article){
    //hash the article title to get a unique key
     const key = hashCode(article.title);
     console.log(article);
    set(ref(db, 'users/'+currentUser.uid+'/articles/'+key), article)
  }

function updateLocalNote(article, note, index){
    article.notes[index] = note;
}

async function getCurrentArticle(currentUser, currentArticle){
    const key = hashCode(currentArticle.title);
    const article = await get(ref(db, 'users/'+currentUser.uid+'/articles/'+key));
    return article;
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


export default function WriteBoard() {
    const history = useHistory()
    var article = history.location.state.article;
    const [currentContent, setCurrentContent] = useState(article.content)
    const [currentSentence, setCurrentSentence] = useState(article.sentences[0])
    const [currentNote, setCurrentNote] = useState(article.notes[0])
    const [currentIndex, setCurrentIndex] = useState(0)
    const { currentUser, logout } = useAuth()

    return (
       <>
       <Navigation/>
    {/*Upload Article */}
    <Container style={{ minHeight: "100vh" ,backgroundColor: '#d3e8d1', minWidth:'100vw'}}>
        <br/>
        <br/>
     <div className="row">
            {/*Article */}
            <div className="col-md-6">
            <h2 className="text-center mb-4">Article</h2>
            <Card>
                <Card.Body>
              <p>
                
                {currentSentence}
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
              placeholder="Enter your note here"
              //have the textare be equal to the currentContent
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
              //on tab key press increment index by one
            onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        var localNote = event.target.value;
                        if (event.shiftKey){
                            event.preventDefault();  
                            updateLocalNote(article, localNote, currentIndex); 
                            writeUserArticle(currentUser, article)
                            console.log("before",article.notes[currentIndex])
                            article = updateLocalNote(article, localNote, currentIndex);
                            setCurrentIndex(Math.max(0, currentIndex - 1 ));
                            setCurrentSentence(article.sentences[currentIndex]);
                            console.log('new note', article.notes[currentIndex])
                            setCurrentNote(article.notes[currentIndex]);
                            //update the textarea to be equal to the current note

                        } else {
                            event.preventDefault();
                            //write user note
                            updateLocalNote(article, localNote, currentIndex); 
                            writeUserArticle(currentUser, article)
                            console.log("before",article.notes)
                            article = updateLocalNote(article, localNote, currentIndex);
                            setCurrentIndex(Math.min(article.sentences.length-1, currentIndex + 1));
                            setCurrentSentence(article.sentences[currentIndex]);
                            setCurrentNote(article.notes[currentIndex]);
                            console.log('new note', article.notes)

                        }
                    }
                }}
              ></textarea>
            </div>
              </form>
            </div>
          </div>
    </Container>
       </>
    )

}
