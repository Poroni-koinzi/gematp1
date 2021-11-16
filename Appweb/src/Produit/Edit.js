import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.history.location.itemProps.category,
      name: props.history.location.itemProps.category.name,
      type: props.history.location.itemProps.category.type,
      price: props.history.location.itemProps.category.price,
      rating: props.history.location.itemProps.category.rating,
      warranty_years: props.history.location.itemProps.category.warranty_years,
      available: props.history.location.itemProps.category.available,
      redirection: false
    }
   console.log("id", props);
   //console.log("id produit:", this.state.itemId._id);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
}

handleSubmit = event => {
    event.preventDefault();

    const user = {
        name: this.state.name,
        type: this.state.type,
        price: this.state.price,
        rating: this.state.rating,
        warranty_years: this.state.warranty_years,
        available: this.state.available,
    };
    console.log("user", user);

    axios.put(`http://localhost:8080/products/${this.state.itemId._id}`, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } })
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
                        defaultValue={produit.type}
                        value={this.state.value}
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
export default Edit;