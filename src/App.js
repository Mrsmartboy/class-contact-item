import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuid(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: true,
  },
  {
    id: uuid(),
    name: 'joseph',
    mobileNo: 8688031606,
    isFavorite: true,
  },
  {
    id: uuid(),
    name: 'mounika',
    mobileNo: 9951479584,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
  }

  onAddContact = event => {
    event.preventDefault()

    const {name, mobileNo} = this.state

    if (name !== 0 && mobileNo.length === 10) {
      const newContact = {
        id: uuid(),
        name,
        mobileNo,
        isFavorite: false,
      }

      this.setState(prevState => ({
        contactsList: [...prevState.contactsList, newContact],
        name: '',
        mobileNo: '',
      }))
    } else {
      alert('Please enter the valid details')
    }
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onToggle = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (id === eachContact.id) {
          return {
            ...eachContact,
            isFavorite: !eachContact.isFavorite,
          }
        }
        return eachContact
      }),
    }))
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
              onBlur={this.focus}
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                onToggle={this.onToggle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
