import React,{useEffect,useState} from "react";
import PostBox from "../../components/posts";
import feedService from '../../services/feed';
import {useHistory} from 'react-router-dom'
import { getUserById } from '../../services/users'

import logOut from "../../assets/log-out.svg";
import home from "../../assets/home.svg";
import userProfile from "../../assets/user_profile_temp.svg";
import "./style.css";

interface IFeed{
  text: string,
  userId: { username: string},
  creationDate: string,
  _id: string
}



const MainPage = () => {
  const history = useHistory()
  const id = localStorage.getItem('id')

  const [name,setName] = useState<string>()
  const [username,setUserName] = useState<string>()
  const [feed,setFeed] = useState<IFeed[]>([{
    text:"",userId:{username:""},creationDate:"",_id:""
  }]);

  const changeName = async () =>{
    const response = await getUserById(id as string)
    let finalName = response?.data.name
    const username = response?.data.username
    finalName = finalName?.replaceAll(" ","\n");
    setName(finalName);
    setUserName(username)
  }

  useEffect (() => { 
    getFeed();
    changeName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  
  const getFeed = async()=>  {
    const response = await feedService();
    setFeed(response.data.feed);
  };

  const handleLogin = async() => {
    localStorage.clear();
    history.push('/login')
  }

  const goProfile = async() => {
    history.push('/profile')
  }


  return (
    <div className="container">
      <div className="lateralBar">
        <div className="infoBox">
          <div className="nameBox">
            {name}
            <br/>
            <br />
            {username}
          </div>
        </div>
        <div className="optionsBox">
          <div className="svgBtn">
            <img src={home} alt="home"/>
            <p>Home</p>
          </div>
          <div className="svgBtn profile" onClick={() => {goProfile()}}>
            <img src={userProfile} alt="home"/>
            <p>Perfil</p>
          </div>
          <div className="svgBtn logout"  onClick={() => {handleLogin()}}>
            <img src={logOut} alt="logout"/>
            <p>Sair</p>
          </div>
        </div>
      </div>

      <div >
        <div className="postBox">
          <div className="inputBox">
            <div className="inputUsernameBox">Zequinha_gameplays</div>
            <textarea maxLength={232} rows={4} 
              className="inputField"
              placeholder="Escreva aqui.."
            ></textarea>
            <button className="sendBtn" onClick={(e)=> {changeName()
            }}>POSTAR</button>
          </div>
          <div className="scrollBox">
          {feed.length !== 0 && feed.map(feedPost =>(
              <PostBox username={feedPost.userId.username} text={feedPost.text}/>
          ))
        }
        </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
