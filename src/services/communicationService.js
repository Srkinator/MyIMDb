import axios from 'axios';
import { Component } from 'react';

class CommunicationService extends Component {
    
    getShows(notifyGetRequest) {
        axios.get("http://api.tvmaze.com/shows")
            .then(response => {
                notifyGetRequest(response.data);
            })
            .catch(error => {
                console.log(error);
                // let errorMsg = error.response ? error.response.code : "Server unavailable";
            });
    }

    getSingleShow(notifyGetRequest, id) {
        axios.get(`http://api.tvmaze.com/shows/${id}?embed=cast`)
            .then(response => {
                notifyGetRequest(response.data);
            })
            .catch(error => {
                console.log(error);
                // let errorMsg = error.response ? error.response.code : "Server unavailable";
            });
    }

    searchRequest(notifyGetRequest, search) {
        axios.get(`http://api.tvmaze.com/search/shows?q=${search}`)
            .then(response => {
                notifyGetRequest(response);
            })
            .catch(error => {
                console.log(error);
                // let errorMsg = error.response ? error.response.code : "Server unavailable";
            });
    }


    getSeasons(notifyGetRequest, id) {
        axios.get(`http://api.tvmaze.com/shows/${id}/seasons`)
            .then(response => {
                notifyGetRequest(response.data);
            })
            .catch(error => {
                console.log(error);
                // let errorMsg = error.response ? error.response.code : "Server unavailable";
            });
    }
    
}


export default CommunicationService;