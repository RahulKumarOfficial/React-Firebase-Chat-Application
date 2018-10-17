import React, { Component } from 'react';
import Form from '../Form/Form';
import firebase from 'firebase';
import firebaseConfig from '../../config';
import './App.css';

firebase.initializeApp(firebaseConfig);

class App extends Component{
    constructor(props){
        super(props);

        this.state={
            user:null,
        };
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({user})
        });
    }

    handleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    handleSignOut(){
        firebase.auth().signOut();
    }

    render(){
        return(
            <div className="App">
                <div className="app_header">
                {
                    !this.state.user ?(
                        <button
                            className="app_button"
                            onClick={this.handleSignIn.bind(this)}
                        >Sign In
                        </button>
                    ):(
                        <button
                            className="app_button"
                            onClick={this.handleSignOut.bind(this)}
                        >LogOut
                        </button>
                    )
                }
                </div>
                <div className="app_list">
                <Form user={this.state.user} />
                </div>
            </div>
        )
    }
}
export default App;