import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { FormCreateContact } from 'components/Forms/FormCreateContact';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );

  const [filter, setFilter] = useState('');

  const createContact = body => {
    const isAlreadyExist = contacts.find(
      el => el.name.toLowerCase() === body.name.toLowerCase()
    );
    if (isAlreadyExist)
      return alert(`${isAlreadyExist.name} is already in contacts`);
    const newContact = { ...body, id: nanoid() };
    setContacts(prev => [...prev, newContact]);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleDelete = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const filterContact = ({ target: { value } }) => {
    setFilter(value);
  };

  let filteredContacts = null;
  filteredContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1>Phone book</h1>
      <FormCreateContact createContact={createContact} />

      <h2>Contacts</h2>
      <Filter filterContact={filterContact} />

      {filteredContacts ? (
        <ContactList array={filteredContacts} handleDelete={handleDelete} />
      ) : (
        <ContactList array={contacts} handleDelete={handleDelete} />
      )}
    </div>
  );
};
