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

        this.forceUpdate();
    }

    render() {

        return (
            <div>
                <h1 className='main-title'>BGE Ceremonial Inventory</h1>
                {
                    this.state.inventoryView &&
                    <div>
                        <InventoryComponent />
                        <button 
                            onClick={this.handleChangeInventoryViewClick}
                            className='form-control btn btn-success'
                        >
                            Add a new item
                        </button>
                    </div>
                }
                
                {
                    !this.state.inventoryView &&
                    <div className='form-control'>
                        <NewItemFormComponent 
                            changeScreens={this.handleChangeInventoryViewClick}
                        />

                        <div className='form-group row'>
                            <div className='form-group col-sm-12'>
                                <button 
                                    onClick={this.handleChangeInventoryViewClick}
                                    className='form-control btn btn-danger'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
            
    }
}

export default HomeScreenContainer;