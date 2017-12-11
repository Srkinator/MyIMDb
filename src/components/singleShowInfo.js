import React, { Component } from 'react';

import CommunicationService from '../services/communicationService';
import { Link } from "react-router-dom";
import Search from './search';

class SingleShowInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: "",
            imdb: "",
            result: [],
            visibility: "hidden"
        }

        this.communicationService = new CommunicationService();
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps.match.params.id);
    }

    loadData = (newId) => {
        let id = this.props.match.params.id || newId;

        this.communicationService.getSingleShow((response) => {
            console.log(response);
            this.setState({
                info: response,
                imdb: response.externals.imdb,
                visibility: "hidden"
            });
        }, id);
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
        let counterForMap = 1;
        if (!this.state.info) {
            return <p>Loading....</p>
        }
        console.log(this.state.info);
        return (

            <div className="container">
                <div>
                    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Link to="/shows">
                            <a className="navbar-brand">MyIMDb</a>
                        </Link>
                        <div style={{ position: "absolute", right: 10, top: 10 }}>
                            <Search dispatch={this.catchSearch} />
                        </div>
                    </nav>
                    <div style={{ visibility: this.state.visibility, position: " absolute", zIndex: 10, backgroundColor: "white", width: "100%" }}>
                        {this.state.result.map((show) => (
                            <Link to={`/shows/${show.show.id}`}>
                                <p className="search-item" key={show.show.id}>{show.show.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <h2 style={{ textAlign: "center" }}>{this.state.info.name}</h2>
                <h5 style={{ textAlign: "center", marginBottom: "50px" }}>{this.state.info.genres[0]}, {this.state.info.genres[1]}, {this.state.info.genres[2]} </h5>
                <div className="row">
                    <div style={{ padding: 0 }} className="col-lg-6 col-sm-12">
                        <img alt="a" className="mx-auto" src={this.state.info.image.original} style={{ width: "100%" }} />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        {<p style={{ textAlign: "center", paddingBottom: "50px" }} id="collapseExample"><h5>Summary</h5><br></br>{this.state.info.summary ? this.state.info.summary.replace(/<\/?[^>]+(>|$)/g, "") : ""}</p>}
                        <div style={{ textAlign: "center" }}>
                            <h5 style={{paddingBottom:"30px"}}>Basic Info</h5>
                            <a target="_blank" href={`http://www.imdb.com/title/${this.state.imdb}`}><p style={{ textAlign: "center" }}>IMDB Rating - {this.state.info.rating.average}</p> </a>
                            <p>Language - {this.state.info.language}</p>
                            <p>Show Origin - {this.state.info.network.country.name}</p>
                            <p>Premiere Date - {this.state.info.premiered}</p>
                            <p>Runtime - {this.state.info.runtime} minutes </p>
                            <p>Status - {this.state.info.status}</p>
                            <a target="_blank" href={this.state.info.officialSite}>Official Site</a>

                        </div>
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: "blue" }}>
                    <div id="accordion" className="col-12" role="tablist">
                        <div className="card">
                            <div className="card-header" role="tab" id="headingOne">
                                <h5 className="mb-0">
                                    <a style={{fontSize:"1.5em"}} data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Click to Preview Cast</a>
                                </h5>
                            </div>
                            <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="list-group" style={{ padding: 0 }}>
                                            {this.state.info._embedded.cast.map((actor) => {
                                                console.log(actor);
                                                let personImg = actor.person.image;
                                                let characterImg = actor.character.image;

                                                if (!personImg) {
                                                    personImg = "http://via.placeholder.com/100x150"
                                                }
                                                if (!characterImg) {
                                                    characterImg = "http://via.placeholder.com/100x150"
                                                }

                                                return (
                                                    <div key={counterForMap++} className="list-group-item list-group-item-action hoverable">
                                                        <p className="col-6"><img alt="a" style={{ width: "20%", paddingRight: "10px" }} src={personImg.original ? personImg.original : "http://via.placeholder.com/100x150"} />{actor.person.name}</p>
                                                        <p className="col-6"><img alt="a" style={{ width: "20%", paddingRight: "10px" }} src={characterImg.original ? characterImg.original : "http://via.placeholder.com/100x150"} />{actor.character.name}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleShowInfo;