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




class PersonList extends React.Component {

  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/products`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons: persons });
        console.log(persons);
      })
      .catch((error) => {
        console.log(error)
      });
  }


  render() {
    const person = this.state.persons;
    return (
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: 20 }}>
        {person.map((category) => {
          return (
            <Card key={createFactory.id} style={{ maxWidth: 350, marginLeft: 15, marginRight: 15, marginTop: 20 }}>
              <CardActionArea>
                <NavLink to={{
                  pathname: `/Home/${category.id}`,
                  itemProps: { category: category }
                }}>
                  <CardMedia style={{ width: 330, height: 280 }}
                    image="toto"
                    title={category.type}
                  />
                </NavLink>
                <CardContent />
              </CardActionArea>
              <CardActions style={{ background: 'blue' }}>
                <Typography size="small" style={{ background: 'black', color: 'white' }}>
                  {category.price}€
                </Typography>
                <Button size="small" color="primary" variant="h5" component="h3" style={{ background: 'white' }} onClick={category.prixProduit}>
                  {category.name}
                </Button>
                <Typography size="small" style={{ background: 'red' }}>
                  Quantité:  {category.rating}
                </Typography>
              </CardActions>
            </Card>
          )
        })}
      </div>
    )
  }
}


export default PersonList;