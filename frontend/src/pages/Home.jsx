import { React} from 'react'
import { ToastContainer } from 'react-toastify';
// import SidePanel from '../components/SidePanel';
// import MainPanel from '../components/MainPanel';
import '../components/Main.css'
import HomePanel from '../components/HomePanel';

function Home() {

  return (
    <>
      {/* <div className="mainComponent"> */}
        {/* <SidePanel/> */}
        {/* <MainPanel/> */}
        <HomePanel />
      {/* </div> */}
      <ToastContainer />
    </>
  )
}

export default Home