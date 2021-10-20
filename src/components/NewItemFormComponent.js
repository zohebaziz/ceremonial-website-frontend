import React from "react";
import axios from "axios";

// handles the adding of new items into the inventory
class NewItemFormComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            itemNameFieldValue: '',
            itemQuantityFieldValue: '',
            itemSizeFieldValue: '',
            itemPriceFieldValue: '',
            itemSoruceFieldValue: ''
        };
    }

    // tracks and manages this input field
    handleNameFieldChange = (e) => {

        this.setState({itemNameFieldValue: e.target.value});
    }

    // tracks and manages this input field
    handleQuantityFieldChange = (e) => {

        this.setState({itemQuantityFieldValue: e.target.value});
    }

    // tracks and manages this input field
    handleSizeFieldChange = (e) => {

        this.setState({itemSizeFieldValue: e.target.value});
    }

    // tracks and manages this input field
    handlePriceFieldChange = (e) => {

        this.setState({itemPriceFieldValue: e.target.value});
    }

    // tracks and manages this input field
    handleSourceFieldChange = (e) => {

        this.setState({itemSoruceFieldValue: e.target.value});
    }

    // will send the new items data over to the server
    handleNewItemSubmit = (e) => {

        e.preventDefault();

        const newItem = {
            name: this.state.itemNameFieldValue,
            price: this.state.itemPriceFieldValue,
            size: this.state.itemSizeFieldValue,
            qty: this.state.itemQuantityFieldValue,
            source: this.state.itemSoruceFieldValue
        }

        // give the needed information from the search to the server
        axios.post('http://192.168.69.237:5000/ceremonial-api/items/add', 
                newItem)  // placeholder
            .then(res => { 
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    render() {

        return(
            <div>
                <h2 className='add-screen-title'>Add New Items</h2>
                <form onSubmit={(e) => this.handleNewItemSubmit(e)}>
                    <label>
                        Item Name: 
                        <input
                            type='text'
                            placeholder='enter item name here'
                            value={this.state.itemNameFieldValue}
                            onChange={e => this.handleNameFieldChange(e)}
                        />
                    </label>
                    <br/>
                    <label>
                        Item Price: 
                        <input
                            type='text'
                            placeholder='enter price of item here'
                            value={this.state.itemPriceFieldValue}
                            onChange={e => this.handlePriceFieldChange(e)}
                        />
                    </label>
                    <br/>
                    <label>
                        Item Size: 
                        <input
                            type='text'
                            placeholder='enter size of item here'
                            value={this.state.itemSizeFieldValue}
                            onChange={e => this.handleSizeFieldChange(e)}
                        />
                    </label>
                    <br/>
                    <label>
                        Item Quantity: 
                        <input
                            type='text'
                            placeholder='enter quantity of item here'
                            value={this.state.itemQuantityFieldValue}
                            onChange={e => this.handleQuantityFieldChange(e)}
                        />
                    </label>
                    <br/>
                    <label>
                        Item Source: 
                        <input
                            type='text'
                            placeholder='enter source of item here'
                            value={this.state.itemSoruceFieldValue}
                            onChange={e => this.handleSourceFieldChange(e)}
                        />
                    </label>
                    <br/>
                    <input type='submit'/>
                </form>
            </div> 
        )
    }
}

export default NewItemFormComponent;