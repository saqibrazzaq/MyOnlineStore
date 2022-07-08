import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'

const SignOut = () => {

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/');
  }

  useEffect(() => {
    signOut();
  }, []);
  
  return (
    <div>SignOut</div>
  )
}

export default SignOut