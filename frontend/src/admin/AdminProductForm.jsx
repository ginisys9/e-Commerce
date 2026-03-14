import { useEffect, useState } from "react"
import ProductMenu from "../component/ProductMenu"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
function AdminProductForm() {
    const [category, setCategory] = useState([])
    const [data, setData] = useState({
        name: "",
        category: "",
        description: '',
        image: null,
        perPriceQuantity: "",
        quantity: "",
    })
    const [error, setError] = useState({
        name: "",
        category: "",
        description: '',
        image: null,
        perPriceQuantity: "",
        quantity: "",
    })
    const navigate = useNavigate()
    const getAllCategory = async function () {
        const res = await fetch('http://localhost:3000/api/category');
        const data = await res.json()
        console.log(data);
        
        const { categories } = data
        setCategory(categories)
    }
    const inputChange = function (e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const fileHandleChange = function (e) {
        setData({ ...data, [e.target.name]: e.target.files[0] })
    }
    const validate = function (data) {
        let isValid = true;
        const error = {
            name: "",
            category: '',
            description: '',
            perPriceQuantity: '',
            quantity: '',
            image: null
        }
        if (!data.name) {
            isValid = false
            error.name = 'name is required'
        }
        if (!data.category) {
            isValid = false
            error.category = 'Category is required'
        }
        if (!data.description) {
            isValid = false
            error.description = 'Description is required'
        }
        if (!data.perPriceQuantity) {
            isValid = false
            error.perPriceQuantity = 'price is required'
        }
        if (!data.quantity) {
            isValid = false
            error.quantity = 'Quantity is required'
        }
        if (!data.image) {
            isValid = false
            error.image = 'Image is required'
        }
        setError({ ...error })
        return isValid
    }

    const formSubmit = async function (e) {
        e.preventDefault()
         if (validate(data)) {
            try {
                 const formData = new FormData();
               formData.append("name",data.name)
               formData.append("category",data.category)
               formData.append("description",data.description)
               formData.append("perPriceQuantity",data.perPriceQuantity)
               formData.append("quantity",data.quantity)
               formData.append("image",data.image)
               const response = await fetch('http://localhost:3000/api/product', {
                   method: 'POST',
                   body: formData,
                   headers: {
                       'Authorization': `Bearer ${localStorage.getItem('token')}`
                   },
               })
               navigate('/admin/products')
               toast.success("Product created successfully")
            } catch (error) {
                  console.log(error);
                toast.error('something went wrong')
            }
         }
    }
    useEffect(() => {
        getAllCategory()
    }, [])
    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h1>Admin Profile</h1>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <ProductMenu />
                    </div>
                    <div className="col-md-8">
                        <form onSubmit={formSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={inputChange}
                                    className="form-control"
                                    name="name" />
                                {error.name && <span className="text-danger">{error.name}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    value={data.category}
                                    onChange={inputChange}
                                    className="form-select">
                                    <option> --select--</option>
                                    {category && category.length > 0 && category.map((item, id) => (
                                        <option key={id} value={item._id}>{item.name}</option>))}
                                </select>
                                {error.category && <span className="text-danger">{error.category}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="description">Descriptions</label>
                                <input
                                    type="text"
                                    onChange={inputChange}
                                    value={data.description}
                                    className="form-control"
                                    name="description" />
                                {error.description && <span className="text-danger">{error.description}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor=" perPriceQuantity">Per Price Quantity</label>
                                <input
                                    type="text"
                                    onChange={inputChange}
                                    value={data.perPriceQuantity}
                                    className="form-control"
                                    name="perPriceQuantity" />
                                {error.perPriceQuantity && <span className="text-danger">{error.perPriceQuantity}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Quantity</label>
                                <input
                                    type="quantity"
                                    value={data.quantity}
                                    onChange={inputChange}
                                    className="form-control"
                                    name="quantity" />
                                {error.quantity && <span className="text-danger">{error.quantity}</span>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    onChange={fileHandleChange}
                                    className="form-control"
                                    name="image" />
                                {error.image && <span className="text-danger">{error.image}</span>}
                            </div>
                            <button type="submit" className="btn btn-dark float-end">Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProductForm