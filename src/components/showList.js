import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ShowList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfShows: []
        };
        
    }

    render() {
        return (
              <div className="container">
                <div className="row">
                    {this.props.shows.map((show) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6" key = {show.id}>
                                <img src={show.image} style={{width:"100%"}}/>
                                <Link to ={`/shows/${show.id}`}>
                                <h3>{show.name}</h3>
                                </Link>
                            </div>
                        )
                    }
                    )
                    }
                </div>
            </div>       
        );
    }
}

export default ShowList ;