import { useEffect, useState,} from "react"
import { useNavigate } from "react-router-dom"
function Login() {
    const [formData,setFormData] = useState({
       email:"",
       password:""
    })
    const navigate  = useNavigate()
     const handleSubmit = function(e){      
        setFormData(({...formData,[e.target.name]:e.target.value}))
     } 
      const fetchData = async function() {
          const res = await fetch('http://localhost:3000/api/user/loginUser',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          })
           const data = await res.json()
           const {user,token} = data
           localStorage.setItem('token',token)
           localStorage.setItem('user',JSON.stringify(user))
           navigate('/profile')
      }
     const formSubmit = function(e){
        e.preventDefault()
        fetchData()
     }
     useEffect(function(){
        const token = localStorage.getItem('token')
        if(token){
           navigate('/profile')
        }
     })
  return (
    <div className="my-5">
       <div className="container">
         <div className="text-center">
            <h1>Login</h1>
         </div>
       </div>
 <form className="mx-auto" onSubmit={formSubmit} style={{width:"50%"}}>
    <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" 
    className="form-control"
     name="email"
     value={formData.email}
       onChange={handleSubmit}
     />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" 
       className="form-control"
       name="password"
       value={formData.password}
       onChange={handleSubmit}
     />
  </div>
  <button type="submit" className="btn btn-dark">Submit</button>
</form>
    </div>
  )
}
export default Login

