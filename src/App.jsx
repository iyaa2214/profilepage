import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // animasi dan custom CSS

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Jika fetch gagal
  if (!user) {
    return <p className="text-center mt-5 text-danger">Gagal memuat data.</p>;
  }

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center "
      style={{ background: 'linear-gradient(to right,  #00c6ff, #0072ff)', padding: '4rem' }}
    >
      {/* Card Profil */}
      <div
        className="card text-center shadow-lg animate-card" 
        style={{ width: '22rem', height: '30rem',
          backgroundColor: 'rgba(255,255,255,0.95)', 
          borderRadius: '1rem',
        }}
      >
        <img
          src={user.picture.large}
          className="card-img-top rounded-circle border border-primary shadow-sm mx-auto mt-3"
          alt="User"
          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h4 className="card-title mt-2">{user.name.first} {user.name.last}</h4>
          <p className="text-muted mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="text-muted mb-1"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-muted mb-1"><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
          <p className="text-muted mb-2"><strong>Age:</strong> {user.dob.age} | <strong>Username:</strong> {user.login.username}</p>
          <button
            className="btn btn-gradient mt-3"
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              border: 'none',
              color: 'white',
              width: '100%',
              fontWeight: '600',
            }}
          >
            Muat Ulang Profil
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-light mt-3">
        Design by Gustia Rahmi
      </footer>
    </div>
  );
}

export default App;
