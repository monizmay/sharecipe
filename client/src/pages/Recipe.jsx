import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css'

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    //fetchData();
    axios.get('http://localhost:4000/recipe')
      .then(response => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

    //console.log(data);
  }, []);
  
  // const Header = () => {
  //   return (
  //     <header style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: 'white'}}>
  //       <div style={{display: 'flex'}}>
  //         <div style={{textAlign: 'left'}}><h1>Recipe List</h1></div>
  //         <div style={{textAlign: 'right'}}><Link to={"/signup"}>Recipe</Link></div>
  //       </div>
  //     </header>
  //   );
  // };
  const Header = () => {
    return (
      <header style={{ position: 'fixed',  top: 0, left: 0, right: 0, backgroundColor: 'white', width: '100%'}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center' }}><h1>Recipe List</h1></div>
          {/* <div style={{textAlign: 'center', fontSize: '50px'}}><input type="text" name="myInput" placeholder='Enter search text' style={{ width: '500px', height: '50px' }} /><button style={{ width: '75px', height: '50px'}}>Search</button></div> */}
        </div>
        <div style={{ textAlign: 'right', verticalAlign: 'top', height: '50px' }}>Wanna Share Recipe ? <Link to={"/"}>Click Here</Link></div>
      </header>
    );
  };

    const formatMessageContent = (content) => {
      return content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    };

  return (
    <div className='container'>
      <div><Header /></div>
      
      <div className='my-div content message-list'>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <h3 style={{ textAlign: 'left' }}>Recipe title : {message.title}</h3>
              <p style={{ textAlign: 'left' }}>by : {message.name}</p>
              <br />
              <p style={{ textAlign: 'left' }}>{formatMessageContent(message.message)}</p>
              <br />
              <hr />
              <br />
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default MessageList;
