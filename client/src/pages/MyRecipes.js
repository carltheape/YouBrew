import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Modal from 'react-modal';
import { EditBtn, DeleteBtn } from "../components/Buttons";
var sessionStorage = require('web-storage')().sessionStorage;

const isAdmin = sessionStorage.get("admin_token");
// ============react-modal styles=================


const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0,0,0,0.5)'
  },
  content : {
	width		      	  : '50%',
	input			        : '50%',
  top               : '50%',
  left              : '50%',
  right             : 'auto',
  bottom            : 'auto',
  // marginRight       : '-50%',
  transform         : 'translate(-50%, -50%)',
	background        : 'rgba(255,230,153,1.00)',
	inputwidth        : '100%',
	borderRadius      : '10px',
  }
};
// ===================================================

class MyRecipes extends Component {

  state = {
     modalIsOpen: false,
     recipes: []
  };

  componentWillMount() {
    this.loadRecipes();
  }

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    API.getRecipes()
      .then(res => {
        this.setState({ recipes: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  deleteRecipe = id => {
    console.log(">>>>>>>>>>> " + id);
    API.deleteRecipe(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true});
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  // ==========================================
  render() {
    const recipes = this.state.recipes;
    return (

      <Container>
        <div>
          {this.state.recipes.length ? (
            <List>
              {this.state.recipes.map(recipe => (
                <ListItem key={recipe._id}>
                    {isAdmin === true ? 
                      (
                        <EditBtn 
                          class="editRec" 
                          onClick={this.openModal}>
                            Edit
                        </EditBtn>
                      ) : (
                        <div />
                      )}
                    {isAdmin === true ?
                      (
                        <DeleteBtn
                          class="deleteRec"
                          onClick={() => this.deleteRecipe(recipe._id)}
                        >
                          Delete
                        </DeleteBtn>
                      ) : (
                        <div />
                      )}
                    <p id="recipeHeader" className="text-center">{recipe.name}</p>
                    <p id="style" className="text-center">{recipe.style}</p>
                    <p id="abv" className="text-center">{recipe.abv}</p>
                    <p id="description" className="text-center">{recipe.desc}</p>
                    <p id="brewtime" className="text-center">{recipe.brewTime} weeks</p>
                    <p id="season" className="text-center">{recipe.production}</p>
                    <p id="notes" className="text-center">{recipe.notes}</p>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}

        </div>

        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="edit"
        >

          <h2>{this.state.name}</h2>

          <form id="recipe-input-form">
            <p>Recipe: <input id="recipeinput"/></p><br />
            <p>Style: <input id="recipeinput"/></p><br />
            <p>ABV: <input id="recipeinput"/></p><br />
            <p>Description: <br /><textarea rows="4" id="recipeinput"/></p><br />
            <p>Brewtime: <input id="recipeinput"/></p><br />
            <p>Season: <input id="recipeinput"/></p><br />
            <p>Notes: <input id="recipeinput"/></p><br />
          </form>

          <button onClick={this.closeModal}>Cancel</button>
          <button onClick={this.closeModal}>Submit</button>
        </Modal>

      </Container>
    )
  }
}

export default MyRecipes;
