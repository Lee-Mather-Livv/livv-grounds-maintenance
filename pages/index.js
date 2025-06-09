import { useState } from 'react';

export default function Home() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const credentials = {
      admin: { username: 'admin', password: 'Peterc1' },
      operative: { username: 'operative', password: 'ops1234' },
      client: { username: 'client', password: 'Livvhousing1' }
    };

    if (credentials[role]?.username === username && credentials[role]?.password === password) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const renderContent = () => {
    if (role === 'admin') return <div><h2>Admin Panel</h2><p>Manage visits, dates, and flagged issues.</p></div>;
    if (role === 'operative') return <div><h2>Operative Upload</h2><p>Enter address, upload photos, flag dog fouling.</p></div>;
    if (role === 'client') return <div><h2>Client Dashboard</h2><p>View RAG, weather, and extract data.</p></div>;
    return null;
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Livv Grounds Maintenance Portal</h1>
      {!loggedIn ? (
        <>
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
        </>
      ) : (
        renderContent()
      )}
    </div>
  );
}