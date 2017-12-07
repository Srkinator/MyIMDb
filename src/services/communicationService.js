import React, { Component } from 'react';
import axios from 'axios';

class CommunicationService extends Component {
    constructor(props) {
        super(props);
        
    }
    
    getShows(notifyGetRequest) {
        axios.get("http://api.tvmaze.com/shows")
            .then(response => {
                notifyGetRequest(response.data);
            })
            .catch(error => {
                console.log(error);
                let errorMsg = error.response ? error.response.code : "Server unavailable";
                // handleError(errorMsg);
            });
    }

    getSingleShow(notifyGetRequest, id) {
        axios.get(`http://api.tvmaze.com/shows/${id}?embed=cast`)
            .then(response => {
                notifyGetRequest(response.data);
            })
            .catch(error => {
                console.log(error);
                let errorMsg = error.response ? error.response.code : "Server unavailable";
                // handleError(errorMsg);
            });
    }

    searchRequest(notifyGetRequest, search) {
        axios.get(`http://api.tvmaze.com/search/shows?q=${search}`)
            .then(response => {
                notifyGetRequest(response);
            })
            .catch(error => {
                console.log(error);
                let errorMsg = error.response ? error.response.code : "Server unavailable";
                // handleError(errorMsg);
            });
    }


    getSeasons(notifyGetRequest, id) {
        axios.get(`http://api.tvmaze.com/shows/${id}/seasons`)
            .then(response => {
                notifyGetRequest(response.data);
            })
            .catch(error => {
                console.log(error);
                let errorMsg = error.response ? error.response.code : "Server unavailable";
                // handleError(errorMsg);
            });
    }
    
}


export default CommunicationService;