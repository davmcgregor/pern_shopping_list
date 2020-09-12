import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = ({getItems, item}) => {

    useEffect(() => {
        getItems()
    }, [getItems])
    
    const { items } = item;

    return (
        <div>
            <Container>
                <ListGroup>
                  <TransitionGroup className="shopping-list">
                      {items.map(({id, name}) => (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <ListGroupItem>
                            {/* <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={() => setItems(items.filter(item => item.id !== id))}
                            >
                                &times;
                            </Button> */}
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

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList); 
