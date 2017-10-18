import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { OrderBtn, EditBtn } from "../components/Buttons";
import { Select, SelectItem } from "../components/Select";
import ReactTable from 'react-table';
import Modal from 'react-modal';
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table'
var sessionStorage = require('web-storage')().sessionStorage;

// this is a react-table feature that allows us to override some defaults
Object.assign(ReactTableDefaults, {
  defaultPageSize: 5,
  minRows: 3,
  // etc...
});

// ============react-modal styles=================
const orderModalStyles = {
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

// ===================================================

class Availability extends Component {

  state = {
    recipes: [],
    batches: [],
    customers: [],
    modalIsOpen: false
  };

  componentWillMount() {
    this.loadRecipes();
    this.loadBatches();
    this.loadCustomers();
  }

  componentDidMount() {
    this.loadRecipes();
    this.loadBatches();
    this.loadCustomers();
  }

  loadRecipes = () => {
    API.getRecipes()
      .then(res => {
        this.setState({ recipes: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  loadBatches = () => {
    API.getBatches()
      .then(res => {
        this.setState({ batches: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  loadCustomers = () => {
    API.getCustomers()
      .then(res => {
        this.setState({ customers: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal(obj) {
    this.setState({
      modalIsOpen: true,
      _id: obj._id,
      name: obj.name,
      availVol: obj.availVol,
    });
  };


  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  handleFormSubmit = event => {
    const id = document.getElementById("id").value;
    const orderSize = document.getElementById("orderSize").value;
    const invUpdate = this.returnNeg(orderSize);

    event.preventDefault();

    // Update available volume in the Recipe collection
    API.updateRecipeVol(id, invUpdate)
      // Refresh the Inventory and InProcess tables
      .then(res => this.loadRecipes())
      .then(res => this.loadBatches())
      .catch(err => console.log(err));;

    this.closeModal();
  }

  // Converts order amount to the negative value to
  // subtract from the available volume in the database
  // using the mongodb $inc operator
  returnNeg = num => {
    num = Math.abs(num);
    num = -num;
    return num;
  }
  // =============================================

  render() {
    const recipes = this.state.recipes;
    const batches = this.state.batches;
    const customers = this.state.customers;
    return (
      <Container>
        <Row>
          <Col size="md-10">
            <h1>Inventory</h1>
            <ReactTable className="-striped -highlight"
              data={recipes}
              columns={[
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Style",
                accessor: "style",
                maxWidth: 200,

              },
              {
                Header: "ABV",
                accessor: "abv",
                maxWidth: 70,
              },
              {
                Header: "Barrels",
                accessor: "availVol",
                maxWidth: 70,
              },
              {
                Header: "Options",
                accessor: "options",

	              maxWidth: 80,
                Cell: row => (
                  <div>
                    <OrderBtn onClick={() => this.openModal(row.original)}>Order</OrderBtn>
                  </div>
                ),
              }]}
            />
          </Col>
        </Row>
        <Row>
          <Col size="md-10">
            <h1>In process</h1>
            <ReactTable className="-striped -highlight"
              data={batches}
              columns={[
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Style",
                accessor: "style",
                maxWidth: 200,
              },
              {
                Header: "Barrels",
                accessor: "totalVol",
                maxWidth: 70,
              },
			        {
                Header: "Progress",
                accessor: "progressBar",
				        maxWidth: 200,
                Cell: row => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#dadada',
              borderRadius: '2px'
            }}
          >
            <div
              style={{
                width: `${row.value}%`,
                height: '100%',
                backgroundColor: row.value > 66 ? '#85cc00'
                  : row.value > 33 ? '#ffbf00'
                  : '#ff2e00',
                borderRadius: '2px',
                transition: 'all .2s ease-out'
              }}
            />
          </div>
        )
              },
              {
                Header: "Ready by",
                accessor: "endDate",
                maxWidth: 125,


              }]}
            />
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={orderModalStyles}
          contentLabel="order"
        >
          <h2>{this.state.name}</h2>

          <p>Available Barrels: <span>{this.state.availVol}</span></p>

          <form>
            <p>Customer: </p>
            <Select>
              {this.state.customers.map(customer => (
                <SelectItem key={customer._id}>
                  {customer.busName}
                </SelectItem>
              ))}
            </Select>
            <br />
            <p>Barrels Ordered:
              <input name="orderSize" id="orderSize"/>
            </p>
            <br />
            <input type="hidden" id="id" name="id" value={this.state._id}/>
          </form>

          <button onClick={this.closeModal}>Cancel</button>
          <button onClick={this.handleFormSubmit}>Submit</button>

        </Modal>

      </Container>
    )
  }
}

export default Availability;
