const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect user to login page
    // Example: history.push('/login');
  };