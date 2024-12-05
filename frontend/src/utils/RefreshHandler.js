import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from './store';
// import { ChatState } from '../contexts/ChatProvider';

function RefreshHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();

  // const { setUser } = ChatState();
  // const user = useSelector((state) => state.userKey);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {

        const response = await fetch('http://localhost:8080/auth/protected', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        dispatch(setUserData(data.userData));
        // console.log(data.userData);

        // setUser(data.userData);
        if (data.success) {
          setIsAuthenticated(true);
        }
        else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchProtectedData();
    // }, [navigate, setIsAuthenticated, setUser]);
  }, [navigate, dispatch, setIsAuthenticated]);
  return (
    null
  )
}

export default RefreshHandler