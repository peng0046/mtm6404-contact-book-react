import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const EditForm = ({ contact, onUpdate }) => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    useEffect(() => {
        if(contact) {
            setFormData({
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email
            });
        }
    }, [contact])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <button type="button" onClick={() => navigate('/')} className="back-button">Back to Contacts</button>
            <h2>Update Contact</h2>
            <div>
                <input type="text" name="firstName" placeholder="Please enter your First Name" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="lastName" placeholder="Please enter your Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
                <input type="email" name="email" placeholder="Please enter your Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <button type="submit">Update Contact</button>
        </form>
    )

}