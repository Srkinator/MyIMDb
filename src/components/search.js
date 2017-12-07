import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ""
        }

        this.searchValue = this.searchValue.bind(this);
    }

    searchValue(event) {
        this.props.dispatch(event.target.value);
    }

    render() {
        return (
            <div>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.searchValue}/>
                <input onClick={this.props.dispatchSearch} type="button" value="Search" className="btn btn-outline-success my-2 my-sm-0" type="submit" />
            </div>
        );
    }
}

export default Search;