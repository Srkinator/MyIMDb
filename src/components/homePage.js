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

        this.loadData = this.loadData.bind(this);
        this.catchSearch = this.catchSearch.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
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

    catchSearch(searchedString) {
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
                <div style={{ visibility:this.state.visibility }}>
                    <ul>
                        {this.state.result.map((show) => (
                            <li>
                                <a href={`${show.show.url}`}>{show.show.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <Search dispatch={this.catchSearch} />
                <ShowList shows={this.state.listOfShows} />
            </div>
        );
    }
}

export default Main;