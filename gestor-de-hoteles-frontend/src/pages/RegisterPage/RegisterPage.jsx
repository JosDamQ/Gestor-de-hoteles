import React, {useState, useContext, useEffect} from 'react'
import '../RegisterPage/RegisterStyle.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Index'
import Swal from 'sweetalert2'

export const RegisterPage = () => {

  const navigate = useNavigate()
  const {setLoggedIn, loggedIn, setDataUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password:'',
  })

  const[form1, setForm1] = useState({
    name: '',
    surname: '',
    email: '',
    password:'',
    phone:''
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeRegister = (e)=>{
    setForm1({
      ...form1,
      [e.target.name]: e.target.value
    })
  }

  const login = async (e) => {
    try {
      e.preventDefault()
      //const { data } = await axios.post('http://localhost:3200/user/login', form)
      const { data } = await axios.post('http://localhost:2765/User/login', form)
      console.log(data.user)
      if (data.message) {
        //alert(data.message)
        localStorage.setItem('token', data.token)
        setDataUser(data.userLogged)
        setLoggedIn(true)
        navigate('/')
        Swal.fire({
          title: data.message || 'Login successfully',
          icon: 'success',
          timer: 2000
        })
      }
    } catch (err) {
      console.log(err)
      Swal.fire('Error with login', err.response.data.message, 'error')
      //alert(err.response?.data.message)
      throw new Error('Error in login')
    }
  }

  const register = async(e)=>{
    try{
        e.preventDefault()
        const { data } = await axios.post('http://localhost:2765/User/register', form1)
        if(data.message){
            //alert(data.message)
            Swal.fire({
              title: data.message || 'Register successfully',
              icon: 'success',
              timer: 2000
            })
            setForm1({
              name: '',
              surname: '',
              email: '',
              password: '',
              phone: ''
            });
            //navigate('/login')

        }
    }catch(err){
        console.log(err)
        Swal.fire('Error with login', err.response.data.message, 'error')
        //alert(err.response.data.message)
        //throw new Error('Error registering user')
    }
}

  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'src/pages/RegisterPage/Register.js';
    script.type = 'text/javascript'
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>

    <div className="main" >

      <div className="container b-container" id="b-container">
        <form className="form" id="b-form">
          <h2 className="form_title title">Sign in to Website</h2>

          {/*Este input es para el login funcional*/}

          <input onChange={handleChange} name='email' className="form__input" type="text" placeholder="Email"/>
          <input onChange={handleChange} name='password' className="form__input" type="password" placeholder="Password"/><a className="form__link">Forgot your password?</a>
          <button onClick={(e) => login(e)} className="button submit">SIGN IN</button>
        </form>
      </div>
    </div>
    </>
  )
}