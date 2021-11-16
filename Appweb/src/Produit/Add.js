import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';




class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            price: '',
            rating: '',
            warranty_years: '',
            available: '',
            redirection: false

        };
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

        axios.post(`http://localhost:8080/products`, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                this.setState({ redirection: true });
            })
    }


    render() {
        
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/' />;
        }
        return (
            <div style={{ textAlign: "center", marginTop: 60 }}>
                <form onSubmit={this.handleSubmit}>
                    Name: 
                    <input
                        type='text'
                        name='name'
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                    Type: 
                    <input
                        type='text'
                        name='type'
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                    Price:    
                    <input
                        type='text'
                        name='price'
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                    Rating: 
                    <input
                        type='text'
                        name='rating'
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                     Warranty: 
                    <input
                        type='number'
                        name='warranty_years'
                        onChange={this.myChangeHandler}
                    /> <br /> <br />
                      Available:
                      <input
                        type='text'
                        name='available'
                        onChange={this.myChangeHandler}
                    />
                    
                    <br />
                    <br />

                    <input type='submit' style={{ background: "blue", width: 210, height: 50 }} />
                </form>
            </div>
        );
    }
}

export default Add;