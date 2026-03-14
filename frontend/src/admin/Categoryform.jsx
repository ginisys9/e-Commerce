import ProductMenu from "../component/ProductMenu"
import { toast } from 'react-toastify'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Categoryform() {
    const [data, setData] = useState({
        name: "",
        image: null,
    })
    const navigate = useNavigate()
    const onInputChange = function (e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onFileInputChange = function(e){
        setData({...data,[e.target.name]:e.target.files[0]})
    }
    const formSubmit = async function(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("image", data.image)
            const res = await fetch('http://localhost:3000/api/category', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            const dat = await res.json()
            console.log(dat);
            
            toast.success("Category created successfully")
            navigate('/admin/categories')
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h1>Create Category</h1>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <ProductMenu />
                    </div>
                    <div className="col-md-8">
                        <form onSubmit={formSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control"
                                    value={data.name}
                                    onChange={onInputChange}
                                    name="name" />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="image"
                                    className="form-label">Image</label>
                                <input className="form-control"
                                    type="file"
                                    name="image"
                                    onChange={onFileInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark float-end">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Categoryform
