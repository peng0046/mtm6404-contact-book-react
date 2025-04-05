import { useState, useEffect } from "react";
import db from "./utils/db";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch contacts from Firestore
  const fetchContacts = async () => {
    const q = query(collection(db, "contacts"), orderBy("lastName", "asc"));
    const docSnapshot = await getDocs(q);
    const data = docSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContacts(data);
  };

  const goToAdd = () => {
    navigate("/add");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts by search term (firstName or lastName)
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className="container">
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={goToAdd}>Add Contact</button>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {`${contact.firstName} ${contact.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
