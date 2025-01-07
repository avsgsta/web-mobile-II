import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from '../../api/firebase';
import { getAuth, signOut } from "firebase/auth";  // Import Firebase Authentication

function FirestoreData() {
  const [users, setUsers] = useState([]);
  const auth = getAuth();  // Inisialisasi Firebase Authentication

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "IP Pengunjung"));
      const usersList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          IP: data.ipAddress,
          Waktu: data.timestamp.toDate().toLocaleString() // Mengonversi timestamp ke format yang bisa dibaca
        };
      });
      setUsers(usersList);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Logika untuk log out menggunakan Firebase Authentication
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        // Bisa menambahkan redirect ke halaman login setelah logout
        window.location.href = "/app";  // Contoh: Redirect ke halaman login
      })
      .catch((error) => {
        console.error("Error during logout: ", error.message);
      });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Halaman Admin</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>IP</th>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>{user.IP}</td>
              <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>{user.Waktu}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleLogout} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default FirestoreData;
