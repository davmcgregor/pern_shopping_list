import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = ({getItems, item, deleteItem}) => {

    useEffect(() => {
        getItems()
    }, [getItems])
    
    const { items } = item;

    const onDeleteClick = (id) => {
        deleteItem(id)
    }
    
    return (
        <div>
            <Container>
                <ListGroup>
                  <TransitionGroup className="shopping-list">
                      {items.map(({item_id, item_name}) => (
                        <CSSTransition key={item_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                            <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={() => onDeleteClick(item_id)}
                            >
                                &times;
                            </Button>
                                {item_name}
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

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList); 
