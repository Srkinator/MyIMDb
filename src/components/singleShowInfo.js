import React, { Component } from 'react';

import CommunicationService from '../services/communicationService';

class SingleShowInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: "",
            listOfCharacterNames: [],
            listOfActorNames: [],
            imdb: "",
            seasonNumber: [],
            seasonEpisodes: []
        }

        this.communicationService = new CommunicationService();

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let id = this.props.match.params.id;
        let listOfShows = [];
        let listOfCharacterNames = [];
        let listOfActorNames = [];
        let seasonNumber = [];
        let seasonEpisodes = [];

        this.communicationService.getSingleShow((response) => {
            console.log(response);
            response._embedded.cast.map((actor) => {
                listOfActorNames.push(actor.character.name);
                listOfCharacterNames.push(actor.person.name);
            });

            this.setState({
                info: response,
                listOfActorNames: listOfActorNames,
                listOfCharacterNames: listOfCharacterNames,
                imdb: response.externals.imdb
            });

        }, id);

        this.communicationService.getSeasons((response) => {
            response.map((season) => {
                console.log(season);
                seasonNumber.push(season.number);
                seasonEpisodes.push(season.episodeOrder);
            });

            this.setState({
                seasonNumber,
                seasonEpisodes
            });
        }, id);
    }

    render() {
        let counterForMap = 1;
        if (!this.state.info || !this.state.seasonEpisodes || !this.state.seasonNumber) {
            return <p>Loading....</p>
        }
        console.log(typeof (this.state.seasonEpisodes));
        console.log(this.state.seasonNumber);

        return (
            <div className="container">
                <h2 style={{ textAlign: "center", marginBottom: "100px" }}>{this.state.info.name}</h2>
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <img className="mx-auto" src={this.state.info.image.original} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="col-lg-4 col-sm-12 offset-1">
                        <h5>Actor - Character Name </h5>
                        <p>{this.state.listOfActorNames[0]} - {this.state.listOfCharacterNames[0]} </p>
                        <p>{this.state.listOfActorNames[1]} - {this.state.listOfCharacterNames[1]}  </p>
                        <p>{this.state.listOfActorNames[2]} - {this.state.listOfCharacterNames[2]}  </p>
                        <p>{this.state.listOfActorNames[3]} - {this.state.listOfCharacterNames[3]}  </p>
                        <div>SeasonNumber{this.state.seasonNumber.slice(0, 5).map((sNum) => {
                            return (
                                <li key={sNum}>{sNum}</li>
                            )
                        })} </div>
                        <div style={{marginBottom: "20px"}}>Episodes{this.state.seasonEpisodes.slice(0, 5).map((sEpisode) => {
                            return (
                                <li key={counterForMap++}>{sEpisode}</li>
                            )
                        })}</div>
                        <p> Genres : {this.state.info.genres}</p>
                        <a target="_blank" href={`http://www.imdb.com/title/${this.state.imdb}`}>Check out details on IMDB</a>
                    </div>
                    <div className="col-12">
                    <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Check out summary
  </button>
                        {<p id="collapseExample">{this.state.info.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleShowInfo;