import React from 'react'
import {Container, Card} from 'react-bootstrap'
import Navigation from "./Navigation"
import { Link, useHistory } from "react-router-dom"

export default function WriteBoard() {
    const history = useHistory()
    const article = history.location.state.article
    const currentArticle = article.content
    console.log(currentArticle)
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
                {article.content}
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
