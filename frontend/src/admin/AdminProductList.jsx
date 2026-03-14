import ProductMenu from "../component/ProductMenu"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
function AdminProductList() {
  const [products, setProducts] = useState([])
  const getAllProducts = async function () {
    const res = await fetch('http://localhost:3000/api/product')
    const data = await res.json()
    const { products } = data
    setProducts(products)
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h1>Products</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ProductMenu />
          </div>
          <div className="col-md-8">
            <Link className="btn btn-dark float-end"
              to='/admin/product/create'
            >Create</Link>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">image</th>
                  <th scope="col">Per Price Quantity</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 && products.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{item.name}</td>
                    <td>Mohd Intekhab</td>
                    <td>
                      <img src={`http://localhost:3000${item.image}`} width={50} />
                    </td>
                    <td>{item.perPriceQuantity}</td>
                    <td>{item.quantity}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <button className="btn btn-dark">Edit</button>
                    </td>
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

export default AdminProductList