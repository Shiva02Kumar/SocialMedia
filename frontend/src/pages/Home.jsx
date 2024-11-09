import { React} from 'react'
import { ToastContainer } from 'react-toastify';
import SidePanel from '../components/SidePanel';
import MainPanel from '../components/MainPanel';
import '../components/Main.css'

function Home() {

  return (
    <div>
      <div className="mainComponent">
        <SidePanel/>
        <MainPanel/>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home