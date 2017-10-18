import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { EditBtn , AddRecipeBtn , AddUserBtn , AddBatchBtn } from "../components/Buttons";
// import NewRecipeModalContent from "../components/Modal";
import ReactTable from 'react-table';
import Modal from 'react-modal';
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table';
import Switch from 'react-toggle-switch';
var sessionStorage = require('web-storage')().sessionStorage;

// this is a react-table feature that allows us to override some defaults
Object.assign(ReactTableDefaults, {
  defaultPageSize: 5,
  minRows: 3,
  // etc...
});

const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(77,68,41,0.57)'
  },
  content : {
    top               : '40%',
    left              : '50%',
    right             : 'auto',
    bottom            : 'auto',
    marginRight       : '-50%',
    transform         : 'translate(-50%, -50%)',
	backgroundColor   : 'rgba(255,230,153,1.00)',
	borderRadius      : '10px',
  }
};

class Admin extends Component {

  state = {
    name: "",
    email: "",
    administrator: "",
    modalIsOpen: false,
    editModalOpen: false,
    userModalOpen: false,
    batchModalOpen: false,
    recipeModalOpen: false
  };

  constructor() {
    super();

    // this.state = {
    //   name: "",
    //   email: "",
    //   administrator: "",
    //   modalIsOpen: false,
    //   editModalOpen: false,
    //   userModalOpen: false,
    //   batchModalOpen: false,
    //   recipeModalOpen: false
    // };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.openUserModal = this.openUserModal.bind(this);
    this.openBatchModal = this.openBatchModal.bind(this);
    this.openRecipeModal = this.openRecipeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  openEditModal(obj) {
    this.setState({
      name: obj.name,
      email: obj.email,
      administrator: obj.administrator,
      editModalOpen: true,
      batchModalOpen: false,
      recipeModalOpen: false,
      userModalOpen: false,
    });
    this.openModal();
  };

  openUserModal() {
    this.setState({
      userModalOpen: true,
      editModalOpen: false,
      batchModalOpen: false,
      recipeModalOpen: false
    });
    this.openModal();
  };

  openBatchModal() {
    this.setState({
        batchModalOpen: true,
        editModalOpen: false,
        recipeModalOpen: false,
        userModalOpen: false
      });
    this.openModal();
  };

  openRecipeModal() {
    this.setState({
      recipeModalOpen: true,
      editModalOpen: false,
      batchModalOpen: false,
      userModalOpen: false
    });
    this.openModal();
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (



      <Container>

        <Row>
          <Col size="md-14">
            <h1>Access Control</h1>
            <ReactTable className="-striped -highlight"
              data={[{
                name: "Florian Hutter",
                email: "florian.hutter.montreux@gmail.com",
                Administrator: "Yes",
                options: ""
              },
              {
                name: "Florian Hutter",
                email: "florian.hutter.montreux@gmail.com",
                Administrator: "No",
                options: ""
              },
              {
                name: "Florian Hutter",
                email: "florian.hutter.montreux@gmail.com",
                Administrator: "Yes",
                options: ""
              }]}
              columns={[{
                Header: "Name",
                accessor: "name",
				        maxWidth: 210,
              },
              {
                Header: "Email",
                accessor: "email"
              },
              {
                Header: "Administrator",
                accessor: "administrator",
				        maxWidth: 100,
              },
              {
                Header: "Options",
                accessor: "options",
				        maxWidth: 60,
                Cell: row => (
                  <div>
                    <EditBtn onClick={() => this.openEditModal(row.original)}>Edit</EditBtn>
                  </div>
                ),
              }]}
            />
          </Col>
        </Row>

        <AddBatchBtn onClick={this.openBatchModal}>Add new batch</AddBatchBtn>
        <AddRecipeBtn onClick={this.openRecipeModal}>Add new recipe</AddRecipeBtn>
        <AddUserBtn onClick={this.openUserModal}>Add new user</AddUserBtn>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
        {this.state.editModalOpen ?
          <div>
            <h2>Edit a user</h2>
            <p>Name:
              <input size="50" name="editName" id="editName" value={this.state.name}/>
            </p>
            <p>Email:
              <input size="50" name="editEmail" id="editEmail" value={this.state.email}/>
            </p>
            <p>
              <input type="checkbox" name="isAdmin" id="isAdmin"/>
               &zwnj; &zwnj; Give administrative privileges
            </p>
            <button onClick={this.closeModal}>Add user</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          : this.state.userModalOpen ?
          <div>
            <h2>Add a new user</h2>
            <p>Name:
              <input name="userName" id="userName"/>
            </p>
            <p>Email:
              <input name="userEmail" id="userEmail"/>
            </p>
            <p>
              <input type="checkbox" name="isAdmin" id="isAdmin"/>
              Give administrative privileges
            </p>
            <button onClick={this.closeModal}>Add user</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          : this.state.batchModalOpen ?
          <div>
            <h2>Start a batch</h2>
            <p>Select a beer to brew:
              <select>
                <option value="beer1">Beer1</option>
                <option value="beer2">Beer2</option>
                <option value="beer3">Beer3</option>
                <option value="beer4">Beer4</option>
              </select>
            </p>
            <p>Volume(barrel):
              <input name="volume" id="volume"/>
            </p>
            <button onClick={this.closeModal}>Brew</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          : this.state.recipeModalOpen ?
          <div>
            <h2>New Recipe</h2>
            <form>
              <p>Name:
                <input name="beerName" id="beerName"/>
              </p>
              <br />
              <p>Style:
                <input name="style" id="style"/>
              </p>
              <br />
              <p>ABV:
                <input name="abv" id="abv"/>
              </p>
              <br />
              <p>Description:
                <textarea call="form-control" name="description" id="description" rows="3"/>
              </p>
              <br />
              <p>Brew Time(weeks):
                <input name="time" id="time"/>
              </p>
              <br />
              <p>Production:
                <input name="production" id="production"/>
              </p>
              <br />
              <p>Notes:
                <input name="notes" id="notes"/>
              </p>
              <br />
            </form>

            <button onClick={this.closeModal}>Add Recipe</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          :
          console.log("nah")
        }
        </Modal>
      </Container>
    )
  }
}

export default Admin;
