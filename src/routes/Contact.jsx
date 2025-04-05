import { useState, useEffect } from "react";
import db from '../utils/db';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../components/EditForm";

export const Contact = () => {

    const navigate = useNavigate();

    // set up state variable for contact
    const [contact, setContact] = useState({});

    // id from the route params
    const { id } = useParams();

    // create a function to fetch contact
    const fetchContactById = async (contactId) => {
        const docRef = doc(db, "contacts", contactId);
        const docSnapshot = await getDoc(docRef);

        // check if the doc exists in firestore
        if (docSnapshot.exists()) {
            setContact({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });
        } else {
            alert('Contact does not exist in our records! Please provide a valid contact id');
            return null;
        }
    }

    //Update function
    const handleUpdate = async (updatedContact) => {
        try {
            const docRef = doc(db, "contacts", id);
            await updateDoc(docRef, updatedContact);
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    // Delete function
    const handleContactDelete = async () => {
        const msg = "Are you sure you want to delete?";
        try {
            if(confirm(msg) == true) {
                const docRef = doc(db, "contacts", id);
                await deleteDoc(docRef);
                setContact({})
                navigate('/');
            } else {
                navigate(0);
            }
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchContactById(id);
    }, [id]);

    const DeleteButton = () => {
        return (
            <button class="del-btn" onClick={handleContactDelete}>Delete Contact?</button>
        );
    }

    return (
        <div className="contact">
            {contact && (
                <>
                    <EditForm contact={contact} onUpdate={handleUpdate} />
                    <DeleteButton />
                </>
            )}
        </div>
    );
}

export default Contact;