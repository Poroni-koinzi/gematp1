import React, { createFactory } from 'react';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import './App.css';

import { Prompt } from 'react-router-dom'




class Home extends React.Component {

    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/products`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons: persons });
                console.log("toto:", persons);
                console.log("ikram travail avec moi")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        const person = this.state.persons;
        return ( <
            div className = "corps" >
            <
            div > Pour ajouter un produits cliquer sur le bouton <
            NavLink to = {
                {
                    pathname: `/home/Add`,
                }
            } >
            <
            button size = "small"
            color = "primary"
            variant = "h5"
            component = "h3"
            style = {
                { background: 'limegreen', width: 150, height: 50 } } > Add Product < /button>  <
            /NavLink> <
            /div> <
            div style = {
                { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: 20 } } > {
                person.map((category) => {
                    return ( <
                        Card key = { createFactory.id }
                        style = {
                            { maxWidth: 350, marginLeft: 15, marginRight: 15, marginTop: 20 } } >
                        <
                        CardActionArea >
                        <
                        CardMedia style = {
                            { width: 330, height: 280, display: 'inline-block', position: 'relative' } }
                        image = "toto"
                        title = { category.type }
                        /> <
                        Typography style = {
                            { position: 'absolute', fontFamily: 'georgia', justifyContent: 'center', top: 30, left: 80 } } > Name: { category.name } < /Typography> <
                        Typography style = {
                            { position: 'absolute', fontFamily: 'georgia', justifyContent: 'center', top: 80, left: 80 } } > Type: { category.type } < /Typography> <
                        Typography style = {
                            { position: 'absolute', fontFamily: 'georgia', justifyContent: 'center', top: 130, left: 80 } } > Price: { category.price } < /Typography> <
                        Typography style = {
                            { position: 'absolute', fontFamily: 'georgia', justifyContent: 'center', top: 180, left: 80 } } > Rating: { category.rating } < /Typography> <
                        Typography style = {
                            { position: 'absolute', fontFamily: 'georgia', justifyContent: 'center', top: 230, left: 80 } } > Warranty: { category.warranty_years }
                        years < /Typography> <
                        Typography style = {
                            { position: 'absolute', fontFamily: 'georgia', justifyContent: 'center', top: 280, left: 80 } } > Available: { category.available } < /Typography> <
                        CardContent / >
                        <
                        /CardActionArea> <
                        CardActions style = {
                            { background: 'oldlace', justifyContent: 'center' } } >
                        <
                        NavLink to = {
                            {
                                pathname: `/home/edit/${category._id}`,
                                itemProps: { category: category }
                            }
                        } >
                        <
                        Button size = "small"
                        color = "primary"
                        variant = "h5"
                        component = "h3"
                        style = {
                            { background: 'gold' } } >
                        Edit <
                        /Button> <
                        /NavLink> <
                        NavLink to = {
                            {
                                pathname: `/home/delete/${category._id}`,
                                itemProps: { category: category }
                            }
                        } >
                        <
                        Button size = "small"
                        color = "primary"
                        variant = "h5"
                        component = "h3"
                        style = {
                            { background: 'tomato' } } >
                        Delete <
                        /Button> <
                        /NavLink>

                        <
                        /CardActions> <
                        /Card>
                    )
                })
            } <
            /div>

            <
            /div>
        )
    }
}


export default Home;