import ProductMenu from "../component/ProductMenu"
function Profile() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const role = userInfo ? userInfo.role : 0
  return (
     <div className="my-5">
       <div className="container">
         <div className="text-center">
            <h1>Profile</h1>
         </div>
         <div className="row">
          <div className="col-md-4">
            <ProductMenu/>
          </div>
           <div className="col-md-8">
              <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sr No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>{userInfo.name}</td>
                          <td>{userInfo.email}</td>
                          <td>{role === 0 ? 'Admin' : 'User'}</td>
                        </tr>
                      </tbody>
                    </table>
          </div>
         </div>
       </div>
     </div>
  )
}
export default Profile