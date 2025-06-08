import { useState } from 'react';

export default function Home() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (
      (role === 'operative' && username === 'operative' && password === 'ops1234') ||
      (role === 'admin' && username === 'admin' && password === 'Peterc1') ||
      (role === 'client' && username === 'client' && password === 'Livvhousing1')
    ) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const renderPortal = () => {
    if (role === 'operative') return <p>Operative Upload Portal - Upload photos, enter name, dog fouling</p>;
    if (role === 'admin') return <p>Admin Dashboard - Edit dates, view uploads, flag dog fouling</p>;
    if (role === 'client') return <p>Client Portal - RAG summary, last 2 uploads, weather, flags</p>;
    return null;
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Livv Grounds Maintenance Portal</h1>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="operative">Operative</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>
        <br /><br />
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Livv Grounds Maintenance Portal</h1>
      {renderPortal()}
    </div>
  );
}