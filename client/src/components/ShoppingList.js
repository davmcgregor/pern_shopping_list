import React, { useState } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

const ShoppingList = () => {

    const [items, setItems] = useState (
        [
            {id: uuidv4(), name: 'Eggs'},
            {id: uuidv4(), name: 'Milk'},
            {id: uuidv4(), name: 'Carrots'},
            {id: uuidv4(), name: 'Honey'}
        ]
    )
    console.log(items)
    return (
        <div>
            <Container>
                <Button
                  color="dark"
                  style={{marginBottom: '2rem'}}
                  onClick={() => {
                    const name = prompt('Enter Item')
                    if(name) {
                        setItems([...items, {id: uuidv4(), name}])
                    }
                  }}
                >Add Item</Button>
                <ListGroup>
                  <TransitionGroup className="shopping-list">
                      {items.map(({id, name}) => (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <ListGroupItem>
                            <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={() => setItems(items.filter(item => item.id !== id))}
                            >
                                &times;
                            </Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </ListGroup>
            </Container>
        </div>
    )
}

export default ShoppingList
