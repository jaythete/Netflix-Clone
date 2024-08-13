import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import dark_2 from './assets/dark_2.jpg'
import search_icon from './assets/search_icon.svg'
import logo from './assets/logo.png'
import bell_icon from './assets/bell_icon.svg'
import profile_img from './assets/profile_img.png'
import caret_icon from './assets/caret_icon.svg'
import hero_banner from './assets/hero_banner.jpg'
import hero_title from './assets/hero_title.png'
import play_icon from './assets/play_icon.png'
import info_icon from './assets/info_icon.png'
import cards_data from './assets/cards/Cards_data'
import facebook_icon from './assets/facebook_icon.png'
import twitter_icon from './assets/twitter_icon.png'
import youtube_icon from './assets/youtube_icon.png'
import netflix_spinner from './assets/netflix_spinner.gif'
// import instagram_icon from './assets/instagram_icon.png'
import back_arrow_icon from './assets/back_arrow_icon.png'
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import {db ,auth, login, signup, logout} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {

  const navigate= useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log('Logged In');
        navigate('/');

      }else{
        console.log('Logged Out');
        navigate('/login');
      }
    })
  },[])

  return (
    <div className="app">
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player/>} />
      </Routes>
    </div>
  );
}

function Navbar() {

  const navRef=useRef();

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      }
      else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt='' />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>MyList</li>
          <li>BrowseByLanguage</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} className='icons' alt='' />
        <p>children</p>
        <img src={bell_icon} className='icons' alt='' />
        <div className='navbar-profile'>
          <img src={profile_img} className='profile' alt='' />
          <img src={caret_icon} alt='' />
          <div className='dropdown'>
            <p onClick={()=>{logout(  )}}>SignOut</p>
          </div>
        </div>
      </div>
    </div>
  );
}


function Home() {
  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <img src={dark_2} className='banner-img' alt='' />
        <div className='hero-caption'>
          <h2><span>N </span>SERIES</h2>
          <h1>DARK</h1>
          <p>A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.</p>
          {/* <div className='hero-btns'>
            <button><img src={play_icon} className='btn' alt=''/>Play</button>
            <button><img src={info_icon} className='btn dark-btn' alt=''/>More Info</button>
          </div> */}
          <TitleCards />
        </div>
      </div>
      <div className='more-cards'>
        <TitleCards title={"Blockbuster Movies"} category={'top_rated'} />
        <TitleCards title={"Only on Netflix"} category={'popular'} />
        <TitleCards title={"Upcoming"} category={'upcoming'} />
        <TitleCards title={"Top Pics For you"} category={'now_playing'} />
      </div>
      <Footer />
    </div>
  );
}

function TitleCards({ title, category }) {

  const cardsRef = useRef();
  const [apiData,setapiData]=useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzBlNDA3ZjhiOTYwNmFlZTJkZTA0YmI2ZWQzMjE0MiIsIm5iZiI6MTcxOTIxMzAwNC4xOTM4NTUsInN1YiI6IjY2NzkxYTc3MzU4MjkyODViNzNiNDUyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N-JUce3XOx7H3z3SQyAGHtxJ-VFkM5Mf2L28GRPzu9w'
    }
  };
  

  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setapiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handlewheel)
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular On Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='' />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-icons'>
        {/* <img src={instagram_icon} alt=''/> */}
        <img src={twitter_icon} alt='' />
        <img src={facebook_icon} alt='' />
        <img src={youtube_icon} alt='' />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms Of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>2024, Netflix,inc</p>
    </div>
  );
}

function Login() {

  const [signstate,setsignstate]=useState('Sign In');
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [loading,setloading]=useState(false)

  const auth_user=async(event)=>{
    event.preventDefault();
    setloading(true);
    if(signstate==='Sign In'){
      await login(email,password);
    }else{
      await signup(name, email, password);
    }
    setloading(false);
  }

  return (
    loading?<div className='login-spinner'><img src={netflix_spinner} alt='' /></div>:
    <div className='login'>
      <img src={logo} alt='' />
      <div className='login-form'>
        <h1>{signstate}</h1>
        <form>
          {signstate==='Sign Up'?<input type='text' onChange={(e)=>{setname(e.target.value)}} value={name} placeholder='Your name' />:<></>}
          <input type='email' placeholder='Email' onChange={(e)=>{setemail(e.target.value)}} value={email} />
          <input type='password' placeholder='Password'  onChange={(e)=>{setpassword(e.target.value)}} value={password} />
          <button onClick={auth_user} type='submit' >{signstate}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type='checkbox' />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className='form-switch'>
          {signstate==='Sign In'? <p>New to Netflix <span onClick={()=>{setsignstate('Sign Up')}}>Sign Up Now</span></p>:<p>Already have Account <span onClick={()=>{setsignstate('Sign In')}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}


function Player(){

  const{id} =useParams();
  const navigate =useNavigate();

  const [playaipData,setplayapiData]=useState({
    name:'',
    key:'',
    published_at:'',
    type:''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzBlNDA3ZjhiOTYwNmFlZTJkZTA0YmI2ZWQzMjE0MiIsIm5iZiI6MTcxOTIxMzAwNC4xOTM4NTUsInN1YiI6IjY2NzkxYTc3MzU4MjkyODViNzNiNDUyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N-JUce3XOx7H3z3SQyAGHtxJ-VFkM5Mf2L28GRPzu9w'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setplayapiData(response.results[0]))
    .catch(err => console.error(err));

  },[])


  return(
    <div className='player'>
      <img src={back_arrow_icon} onClick={()=>{navigate(-2)}} alt='' />
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embeded/${playaipData.key}`}
      title='trailer' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{playaipData.published_at.slice(0,10)}</p>
        <p>{playaipData.name}</p>
        <p>{playaipData.type}</p>
      </div>
    </div>
  )
}

export default App;
