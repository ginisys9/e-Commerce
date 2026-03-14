
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <div className="app-header">
            <Header/>
        </div>
        <div className="app-body">
           <Outlet/>
        </div>
        <div className="app-footer">
            <Footer/>
        </div>
    </div>
  )
}
export default Layout