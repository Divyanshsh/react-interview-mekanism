import type React from "react";
import ContactList from '../constants/contactListData.json'
import './homepage.style.css'
import { useState, type ChangeEvent } from "react";

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const normalizedSearchTerm = searchTerm.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
    const searchCharacters = normalizedSearchTerm.replace(/\s/g, '');
    const searchedContactList = ContactList.filter((contact) => {
        const fullName = `${contact.first_name} ${contact.last_name}`.toLocaleLowerCase();
        const mobile = String(contact.mobile);
        const nameMatches = searchCharacters.split('').every((character) => fullName.includes(character));
        const numberQuery = searchCharacters.replace(/\D/g, '');
        const isNumberSearch = numberQuery.length > 0 && !/[a-z]/.test(searchCharacters);
        return nameMatches || (isNumberSearch && mobile.includes(numberQuery));
    });

    const splitWords = (word: string, id: number) => {
        return word.split('').map((s, index) => <span key={`${id}-${index}`} className={normalizedSearchTerm.includes(s.toLocaleLowerCase()) ? 'highlight' : ''}>{s}</span>)
    }

    return (
        <div className='main-header'>
            <div>
                <section className="heading-section">
                    <h1>My Contacts</h1>
                </section>
                <section className="list-section">
                    <input placeholder="Search" onChange={handleChangeSearch} />
                    <div className="list-container">
                        {searchedContactList.length === 0 ? (
                            <p className="empty-state">No contacts found</p>
                        ) : searchedContactList.map((contact) => (
                            <div key={contact.id} className="list-container-child">
                                <img src={contact.avatar} />
                                <div className="contact-info-container">
                                    <div>
                                        <h4>
                                            {splitWords(contact.first_name, contact.id + 1)}
                                        </h4>
                                        <h4>
                                            {splitWords(contact.last_name, contact.id + 2)}
                                        </h4>
                                    </div>
                                    <p>{splitWords(String(contact.mobile), contact.id + 3)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HomePage;