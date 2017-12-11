import React, { Component } from 'react';
import { Link } from "react-router-dom";

import CommunicationService from '../services/communicationService';
import Show from '../entities/entities';
import ShowList from './showList';
import Search from './search';


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfShows: [],
            searchedString: "",
            result: [],
            visibility: "hidden"
        };

        this.communicationService = new CommunicationService();

    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let listOfShows = [];
        this.communicationService.getShows((response) => {
            response.map((show) => {
                let singleShow = new Show(show);
                listOfShows.push(singleShow);
            });
            this.setState({
                listOfShows
            });
        });
    }

    catchSearch = searchedString => {
        this.communicationService.searchRequest((response) => {
            this.setState({
                result: response.data,
                visibility: ""
            });
        }, searchedString);
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Link to="/shows">
                            <a className="navbar-brand">MyIMDb</a>
                        </Link>
                        <div style={{position:"absolute", right:10, top: 10}}>
                            <Search dispatch={this.catchSearch} />
                        </div>
                    </nav>
                </div>
                <div style={{ visibility: this.state.visibility, position: " absolute", zIndex: 10, backgroundColor: "white", width: "100%" }}>
                    {this.state.result.map((show) => (
                        <Link to={`/shows/${show.show.id}`}>
                            <p className="search-item" key={show.show.id}>{show.show.name}</p>
                        </Link>
                    ))}
                </div>
                <ShowList shows={this.state.listOfShows} />
            </div>
        );
    }
}

export default Main;