import React from "react";
import InventoryComponent from "../components/InventoryComponent";
import NewItemFormComponent from "../components/NewItemFormComponent";

class HomeScreenContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            inventoryView: true
        };
    }

    // changes views to the new item form
    handleChangeInventoryViewClick = () => {

        this.setState(prevState => {
            return (prevState.inventoryView ? {inventoryView: false} : {inventoryView: true});
        })
    }

    render() {

        return (
            <div>
                <h1 className='main-title'>BGE Ceremonial Inventory</h1>
                {
                    this.state.inventoryView &&
                    <div>
                        <InventoryComponent />
                        <button onClick={this.handleChangeInventoryViewClick}>
                            Add Item
                        </button>
                    </div>
                }
                
                {
                    !this.state.inventoryView &&
                    <div>
                        <NewItemFormComponent />
                        <button onClick={this.handleChangeInventoryViewClick}>
                            Cancel
                        </button>
                    </div>
                }
            </div>
        )
            
    }
}

export default HomeScreenContainer;