import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './helpers/AuthContex';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/check-token', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      }).then((response) => {
      if( response.data.error ) {
        setAuthState(false);
      }
      else {
        setAuthState(true);
      }
    })
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={ { authState, setAuthState } }>
        <Router>
          <div className="navbar">
            <Link to="/"> Home Page </Link>
            <Link to="/create-post"> Create A Post </Link>
            {!authState && (
              <>
                <Link to="/login"> Login </Link>
                <Link to="/register"> Register </Link>
              </>
            )
            }
          </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create-post" element={<CreatePost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
