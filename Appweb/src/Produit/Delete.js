import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Delete extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.itemProps.category) {
    this.state = {
      itemId: props.location.itemProps.category,
      name: props.location.itemProps.category.name,
      type: props.location.itemProps.category.type,
      price: props.location.itemProps.category.price,
      rating: props.location.itemProps.category.rating,
      warranty_years: props.location.itemProps.category.warranty_years,
      available: props.location.itemProps.category.available,
      redirection: false
    }
    }
   console.log("idpro", props);
   console.log("id :", this.state.itemId._id);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
}

handleSubmit = event => {
    event.preventDefault();

    axios.delete(`http://localhost:8080/products/${this.state.itemId._id}`, { headers: { 'Content-Type': 'application/json' } })
        .then(res => {
            this.setState({ redirection: true });
        })
} 


  render() {
    const produit = this.state.itemId;
    const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/' />;
        }
      return(
          <div style={{ textAlign: "center", marginTop: 60 }}>
                <form onSubmit={this.handleSubmit}>
                    Name: 
                    <input
                        type='text'
                        name='name'
                        defaultValue={produit.name}
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                    Type: 
                    <input
                        type='text'
                        name='type'
                        Value={produit.type}
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                    Price:    
                    <input
                        type='text'
                        name='price'
                        defaultValue={produit.price}
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                    Rating: 
                    <input
                        type='text'
                        name='rating'
                        defaultValue={produit.rating}
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                     Warranty: 
                    <input
                        type='number'
                        name='warranty_years'
                        defaultValue={produit.warranty_years}
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                      Available:
                      <input
                        type='text'
                        name='available'
                        defaultValue={produit.available}
                        onChange={this.myChangeHandler}
                    />
                   
                    
                    <br />
                    <br />

                    <input type='submit' style={{ background: "blue", width: 210, height: 50 }} />
                </form>
            </div>
        
      )
  }


}
export default Delete;