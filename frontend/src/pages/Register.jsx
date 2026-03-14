import { useState,useEffect,} from "react"
import  { Link,useNavigate} from "react-router-dom"
function Register() {
    const [formData,setFormData] = useState({
       name:"",
       email:"",
       password:""
    })
     const navigate  = useNavigate()
    const [loading,setLoading] = useState(null)
     const handleSubmit = function(e){
        setFormData(({...formData,[e.target.name]:e.target.value}))
     }
     /**
      *  calling the api
      */
     const formSubmit = function(e){
        e.preventDefault()
        fetchData()
     }
      const fetchData = async function() {
          const response = await fetch('http://localhost:3000/api/user',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          })
          const data = await response.json()
          setLoading(data)
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
            <h1>Register</h1>
         </div>
        {loading && 
          <div className="alert alert-success">
            Acount created successfully <Link to='/login'>click here</Link>
          </div>
        }
       </div>
 <form className="mx-auto"
   onSubmit={formSubmit}
 style={{width:"50%"}}>

  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text"
       className="form-control"
       name="name"
       value={formData.name}
       onChange={handleSubmit}
      />
  </div>

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
export default Register