import { useState } from 'react';

export default function Home() {
  const [role, setRole] = useState(null);

  const renderLogin = () => (
    <div>
      <h2>Login</h2>
      <button onClick={() => setRole('operative')}>Operative</button>
      <button onClick={() => setRole('admin')}>Admin</button>
      <button onClick={() => setRole('client')}>Client</button>
    </div>
  );

  const renderView = () => {
    switch (role) {
      case 'operative':
        return <p>Operative Upload: Address, Name, Photos, Dog Fouling</p>;
      case 'admin':
        return <p>Admin Dashboard: Edit Uploads, View All</p>;
      case 'client':
        return <p>Client Panel: RAG Summary, Latest Uploads, Download</p>;
      default:
        return renderLogin();
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Livv Grounds Maintenance Portal</h1>
      {renderView()}
    </div>
  );
}