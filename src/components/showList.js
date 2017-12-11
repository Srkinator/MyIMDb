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
                    <h1 style={{paddingBottom:"50px", textAlign:"center",width:"100%", color:"#abc3ea"}}>FEATURED SHOWS</h1>
                </div>
                <div className="row">
                    {this.props.shows.map((show) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={show.id} >
                                <Link to={`/shows/${show.id}`}>
                                    <img alt="a" src={show.image} style={{ width: "100%", height: "308px" }} />
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

export default ShowList;