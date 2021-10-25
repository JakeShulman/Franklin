import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import Navigation from './Navigation';
import Section from './Section'
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const handle_firebase_auth = (promise) => {
        return promise
        .then(data => ([data, undefined]))
        .catch(error => {
            let errorMessage = '';
            console.log(error)
            switch (error.code.substr(5)) {
                case "invalid-email":
                  errorMessage = "Email address is invalid.";
                  break;
                case "email-already-in-use":
                  errorMessage = "Email address is already in use.";
                  break;
                case "wrong-password":
                  errorMessage = "Your password is wrong.";
                  break;
                case "user-not-found":
                  errorMessage = "User with this email doesn't exist.";
                  break;
                case "user-disabled":
                  errorMessage = "User with this email has been disabled.";
                  break;
                case "weak-password":
                  errorMessage = "Password is not strong enough, need at least 6 characters.";
                  break;
                case "operation-not-allowed":
                  errorMessage = "Signing in with Email and Password is not enabled.";
                  break;
                default:
                  errorMessage = "Failed to Login";
            }
            return Promise.resolve([undefined, errorMessage])
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        setError('')
        setLoading(true)
        let [user, userErr] = await handle_firebase_auth(login(emailRef.current.value, passwordRef.current.value))
        if(userErr){
            setError(userErr);
        } else{
        history.push('/upload')
        }
        setLoading(false)
    }
    return (
        <>
        <Navigation/>
        <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh" ,backgroundColor: '#d3e8d1', minWidth:'100vw'}}
      >
        <div className = 'w-100' style={{ maxWidth: '400px'}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log in </h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <pre/>
                    <Button disabled={loading} className='w-100'type='submit' variant='primary'>
                        <div style={{color: 'white'}}>Log In</div>
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to='/signup'>Sign up  </Link>
        </div>
        </div>
        </Container>
        </>
    )
}
