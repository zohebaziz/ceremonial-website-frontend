import React from "react";
import axios from "axios";

// handles the inventory screen
class InventoryComponent extends React.Component {

    constructor(props) {

        super(props);
        
        this.state = {

            searchFieldValue: '',
            inventoryItems: []
        };
    }

    // changes state depending on what is entered into the input bar
    handleChange = (e) => {

        this.setState({searchFieldValue: e.target.value})
    }

    // submit seach field value
    handleSearchButtonClick = () => {

        alert('search for: ' + this.state.searchFieldValue); //placeholder
    }

    // show a picture when this item is clicked
    handleViewItemClick = (item) => {

        axios.get('http://192.168.69.237:5000/ceremonial-api/items/view/'+item.item_id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    // tells the server that a user has puchased an item
    handleBuyItemClick = (item) => {

        const newItem = {
            item_id: item.item_id, 
            name: item.name,
            price: item.price,
            size: item.size,
            qty: item.qty - 1,
            source: item.source
        };

        axios.put('http://192.168.69.237:5000/ceremonial-api/items/update',
            newItem)
            .then(res => {
                this.setState(prevState => ({
                    inventoryItems: prevState.inventoryItems.map(
                    item => (item.item_id === newItem.item_id ? Object.assign(item, { qty: newItem.qty }) : item)
                  )
                }));

                console.log(res.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })

        axios.post()
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error =>
                console.error('There was an error!', error));
    }

    // will get all the inventory data on startup
    componentDidMount = () => {

        axios.get('http://192.168.69.237:5000/ceremonial-api/items')
            .then(res => {
                this.setState({inventoryItems: res.data});
                console.log(this.state.inventoryItems)
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    render() {

        return (
            <div>
                <h2 className='inventory-screen-title'>Current Stash</h2>
                <input 
                    type='text'
                    placeholder='enter item to find'
                    value={this.state.searchFieldValue}
                    onChange={e => this.handleChange(e)}
                />
                <button
                    onClick={this.handleSearchButtonClick}
                >
                    search
                </button>
                <ul className='inventory-list'>
                    {
                        this.state.inventoryItems.map((item, index) => (
                            <li key={index} className='inventory-item'>
                                {item.name} {item.price} {item.size} {item.qty} {item.source}
                                <button onClick={() => this.handleBuyItemClick(item)}>
                                    buy
                                </button>
                                <button onClick={() => this.handleViewItemClick(item)}>
                                    view
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default InventoryComponent;