import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../contexts/ChatProvider';

function RefreshHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const { setUser } = ChatState();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {

        const response = await fetch('http://localhost:8080/auth/protected', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        setUser(data.userData);
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
  }, [navigate, setIsAuthenticated, setUser]);
  return (
    null
  )
}

export default RefreshHandler