import { useState } from 'react';

export default function GroundsMaintenancePortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addresses, setAddresses] = useState([]);

  const handleFileChange = (id, type, file) => {
    const fileURL = URL.createObjectURL(file);
    setAddresses(prev =>
      prev.map(addr =>
        addr.id === id ? { ...addr, [type]: fileURL } : addr
      )
    );
  };

  const handleNoteChange = (id, value) => {
    setAddresses(prev =>
      prev.map(addr =>
        addr.id === id ? { ...addr, notes: value } : addr
      )
    );
  };

  const handleSubmit = (id) => {
    const address = addresses.find(addr => addr.id === id);
    if (!address.beforePhoto || !address.afterPhoto) {
      alert("Please upload both before and after photos before submitting.");
      return;
    }
    alert("Update submitted successfully for " + address.schemeName);
  };

  const handleLogin = () => {
    if (username.trim() === "operative" && password === "1234") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split('\n');
      const newAddresses = lines
        .filter(line => line.trim().length > 0)
        .map((line, index) => {
          const [schemeName, fullAddress, lastVisit, nextDue] = line.split(',');
          return {
            id: Date.now() + index,
            schemeName: schemeName?.trim(),
            fullAddress: fullAddress?.trim(),
            lastVisit: lastVisit?.trim(),
            nextDue: nextDue?.trim(),
            beforePhoto: null,
            afterPhoto: null,
            notes: ''
          };
        });
      setAddresses(newAddresses);
    };
    reader.readAsText(file);
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 24 }}>
        <img src="/Peter Crosby Landscapes.JPG" alt="PCL Logo" style={{ width: 180, marginBottom: 16 }} />
        <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#1d4ed8' }}>Livv Grounds Maintenance Portal</h1>
        <div style={{ backgroundColor: '#ffffff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 16 }}>
            <label>Username</label><br />
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: 8 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Password</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} />
          </div>
          <button onClick={handleLogin} style={{ width: '100%', padding: 10, backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 4 }}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <img src="/Peter Crosby Landscapes.JPG" alt="PCL Logo" style={{ width: 150, marginBottom: 20 }} />
      <h2 style={{ color: '#1e40af', marginBottom: 20 }}>Grounds Maintenance Dashboard</h2>

      <div style={{ marginBottom: 40 }}>
        <label><strong>Import Address CSV:</strong></label><br />
        <input type="file" accept=".csv" onChange={handleCsvUpload} style={{ marginTop: 8 }} />
        <p style={{ fontSize: 12, color: '#6b7280' }}>CSV format: Scheme Name, Full Address, Last Visit (YYYY-MM-DD), Next Due (YYYY-MM-DD)</p>
      </div>

      {addresses.map(addr => (
        <div key={addr.id} style={{ marginBottom: 40, padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <h2>{addr.schemeName}</h2>
          <p><strong>Address:</strong> {addr.fullAddress}</p>
          <p><strong>Last Visit:</strong> {addr.lastVisit}</p>
          <p><strong>Next Due:</strong> {addr.nextDue}</p>

          <div>
            <label>Before Photo</label><br />
            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(addr.id, 'beforePhoto', e.target.files[0])} /><br />
            {addr.beforePhoto && <img src={addr.beforePhoto} alt="Before" style={{ marginTop: 10, width: '100%', maxWidth: 300 }} />}
          </div>

          <div style={{ marginTop: 20 }}>
            <label>After Photo</label><br />
            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(addr.id, 'afterPhoto', e.target.files[0])} /><br />
            {addr.afterPhoto && <img src={addr.afterPhoto} alt="After" style={{ marginTop: 10, width: '100%', maxWidth: 300 }} />}
          </div>

          <div style={{ marginTop: 20 }}>
            <label>Notes</label><br />
            <textarea value={addr.notes} onChange={(e) => handleNoteChange(addr.id, e.target.value)} style={{ width: '100%', height: 80 }} />
          </div>

          <button style={{ marginTop: 20 }} onClick={() => handleSubmit(addr.id)}>Submit Update</button>
        </div>
      ))}
    </div>
  );
}