import React, { useState, useEffect } from "react";
import "./Header.scss";
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import { db, collection, addDoc, doc, getDoc, setDoc, updateDoc } from '../../api/firebase'; 
import axios from 'axios'; 

const Header = () => {
  const [visitCount, setVisitCount] = useState(0); 
  const [visitorIP, setVisitorIP] = useState(""); 

  const getVisitorIP = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      setVisitorIP(response.data.ip); 
      console.log("Visitor IP Address: ", response.data.ip); 

      saveVisitorIP(response.data.ip);
    } catch (error) {
      console.error("Error fetching visitor IP:", error);
    }
  };

  const saveVisitorIP = async (ip) => {
    const visitRef = collection(db, "IP Pengunjung");

    try {
      await addDoc(visitRef, {
        ipAddress: ip,
        timestamp: new Date(),
      });
      console.log("Visitor IP saved to Firestore:", ip);
    } catch (error) {
      console.error("Error saving IP to Firestore:", error);
    }
  };

  const incrementVisitCount = async () => {
    const visitRef = doc(db, "visitCount", "pageVisits");

    try {
      const docSnap = await getDoc(visitRef);
      if (docSnap.exists()) {
        const currentCount = docSnap.data().count;
        console.log("Current Count: ", currentCount);
        await updateDoc(visitRef, { count: currentCount + 1 });
        console.log("Updated Count to: ", currentCount + 1);
      } else {
        console.log("No data found, setting initial count to 1.");
        await setDoc(visitRef, { count: 1 });
      }
    } catch (error) {
      console.error("Error updating visit count:", error);
    }
  };

  const getVisitCount = async () => {
    const visitRef = doc(db, "visitCount", "pageVisits");

    try {
      const docSnap = await getDoc(visitRef);
      if (docSnap.exists()) {
        setVisitCount(docSnap.data().count);
      } else {
        setVisitCount(0);
      }
    } catch (error) {
      console.error("Error fetching visit count:", error);
    }
  };

  useEffect(() => {
    getVisitCount(); 
    incrementVisitCount(); 
    getVisitorIP(); 
  }, []);

  return (
    <header className="header">
      <Navbar />
      <div className="header-content flex align-center justify-center flex-column text-center">
        <SearchForm />
        <h1 className="text-white header-title ls-2">What are your favorite cuisines?</h1>
        <p className="text-uppercase text-white my-3 ls-1">personalize your experience</p>
      </div>
      <p>Page visits: {visitCount}</p>
      <p>Visitor IP: {visitorIP}</p>
    </header>
  );
};

export default Header;
