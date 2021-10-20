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

                if(item.qty > 0) {

                    this.setState(prevState => ({
                        inventoryItems: prevState.inventoryItems.map(
                        item => (item.item_id === newItem.item_id ? Object.assign(item, { qty: newItem.qty }) : item)
                      )
                    }));
                }  

                console.log(res.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })

            // potsts the order to be added to the transaction history
        // axios.post()
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })
        //     .catch(error =>
        //         console.error('There was an error!', error));
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
            <div className='form-control'>
                <h2 className='inventory-screen-title'>Current Stash</h2>
                <div className='form-group row'>
                    <div className='form-group col'>
                        <input 
                            type='text'
                            placeholder='enter item to find'
                            value={this.state.searchFieldValue}
                            onChange={e => this.handleChange(e)}
                            className='form-control search-label'
                        />
                    </div>
                    <div className='form-group col'>
                        <button
                            onClick={this.handleSearchButtonClick}
                            className='form-control btn btn-secondary'
                        >
                            search
                        </button>
                    </div>
                </div>

                <ul className='from-control list-group'>
                <li key={9999999999999999999999999} className='list-group-item'>
                                <div className='form-group row'>
                                    <div className='form-group col-sm-2'>
                                        <strong>name</strong>
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        <strong>price</strong>
                                        </div>
                                    <div className='form-group col-sm-2'>
                                        <strong>size</strong>
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        <strong>quantity</strong>
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        <strong>source</strong>
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        <strong>buy?</strong>
                                    </div>
                                </div>
                            </li>
                    {
                        this.state.inventoryItems.map((item, index) => (
                            <li key={index} className='list-group-item'>
                                <div className='form-group row'>
                                    <div className='form-group col-sm-2'>
                                        <span className='item-caps'>{item.name}</span>
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        {(item.price).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',})}
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        <span className='item-caps'>{item.size}</span>
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        {item.qty}
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        {item.source}
                                    </div>
                                    <div className='form-group col-sm-2'>
                                        <button 
                                            onClick={() => this.handleBuyItemClick(item)}
                                            className='btn btn-outline-dark'
                                        >
                                            buy
                                        </button>
                                    </div>
                                </div>
                                {/*
                                <button 
                                    onClick={() => this.handleViewItemClick(item)}
                                    className='btn btn-outline-dark'
                                >
                                    view
                                </button>
                                */}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default InventoryComponent;