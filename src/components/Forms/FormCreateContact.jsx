import { useState } from 'react';
import css from './Form.module.css';

export const FormCreateContact = ({ createContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'name') setName(value);
    else setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Name</h3>
        <input
          className={css.input}
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <h3>Number</h3>
        <input
          className={css.input}
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};
