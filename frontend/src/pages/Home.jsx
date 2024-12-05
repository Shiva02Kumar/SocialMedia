import { React } from 'react'
// import { ToastContainer } from 'react-toastify';
import SidePanel from '../components/SidePanel';
// import MainPanel from '../components/MainPanel';
import '../components/Main.css'
import HomePanel from '../components/HomePanel';
import { useSelector } from 'react-redux';
import MainPanel from '../components/MainPanel';

function Home() {
  const selectedChat = useSelector((state) => state.selectedChatKey);
  const lightMode = useSelector((state) => state.themeKey);
  console.log(selectedChat)
  return (
    <>
      <div className={"mainComponent" + (lightMode ? '' : " darkMain")}>
        <SidePanel />
        {/* <MainPanel/> */}
        {selectedChat && Object.keys(selectedChat).length === 0 ? <HomePanel /> : <MainPanel />}
      </div>
    </>
  )
}

export default Home