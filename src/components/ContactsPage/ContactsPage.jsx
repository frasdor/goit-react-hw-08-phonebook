import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { fetchContacts, addContact, deleteContact } from '../../redux/contacts/contactsThunks';
import { setFilter } from '../../redux/contacts/contactsSlice';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const loading = useSelector(state => state.contacts.loading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    const isExistingContact = contacts.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (isExistingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Contacts</h1>
      <ContactForm onSubmit={handleAddContact} />
      <Filter value={filter} onChange={handleFilterChange} />
      {loading ? <p>Loading...</p> : <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />}
    </div>
  );
};

export default ContactsPage;
