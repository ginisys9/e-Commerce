import { Link } from "react-router-dom"
import ProductMenu from "../component/ProductMenu"
import { useState,useEffect } from "react"
function CategoryList(){
    const [category,setCategory] = useState([])
    const getCategory = async function(){
      const response = await fetch('http://localhost:3000/api/category')
      const data = await response.json()
      const {categories,pagination} = data
       setCategory(categories)
    }
    useEffect(function(){
        getCategory()
    },[])  
  return (
     <div className="my-5">
       <div className="container">
         <div className="text-center">
            <h1>Create</h1>
         </div>
         <div className="row">
          <div className="col-md-4">
            <ProductMenu/>
          </div>
<div className="col-md-8">
<Link className="btn btn-dark float-end"
 to='/admin/category/create'
>Create</Link>
 <table className="table">
  <thead>
    <tr>
      <th scope="col">Sr No</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>
    {category && category.length > 0 && category.map((item,id)=>(
      <tr key={id}>
      <th scope="row">{id+1}</th>
      <td>{item.name}</td>
      <td><img src={item.logo} width="50px" height="50px"/></td>
    </tr>
    ))}
  </tbody>
   </table>
          </div>
         </div>
       </div>
     </div>
  )
}
export default CategoryList