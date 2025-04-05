import { useState } from "react";
import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Add = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const c = collection(db, "contacts");

        try {
            const contact = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            })
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <button type="button" onClick={() => navigate('/')} className="back-button">Back to Contacts</button>
            <h2>Add Contact</h2>
            <div>
                <input type="text" name="firstName" placeholder="Please enter your First Name" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="lastName" placeholder="Please enter your Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
                <input type="email" name="email" placeholder="Please enter your Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <button type="submit">Add Contact</button>
        </form>
    );
}

export default Add;