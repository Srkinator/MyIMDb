import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ""
        }

    }

    searchValue =(event) =>{
        this.props.dispatch(event.target.value);
    }

    render() {
        return (
            <div>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.searchValue}/>
            </div>
        );
    }
}

export default Search;