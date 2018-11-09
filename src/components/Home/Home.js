import React, {Component} from 'react';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import '../../config';
import './Home.css';
import { API_URL, API_KEY } from '../../config';

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
    }   

    componentDidMount() {
        this.setState({ loading: true })
        const endpoint = `${API_URL}movie/popular?api_key${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint)
    }

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true});

        if (this.state.searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key${API_KEY}&language=en-US&page=${this.state.currenPage + 1}`;
        } else {
            endpoint = `${API_URL}movie/popular?api_key${API_KEY}&language=en-US&query${this.state.searchTerm}page=${this.state.currenPage + 1}`;
        }
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies: [...this.state.movies, ...result.results],
                heroImage: this.state.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            })
        })
    }

    render(){
        return(
            <div className='rmdb-home'>
                <HeroImage />
                <SearchBar />
                <FourColGrid />
                <Spinner />
                <LoadMoreBtn />
            </div>
        )
    }
}

export default Home;