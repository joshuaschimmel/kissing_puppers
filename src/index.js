import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import API from './api';


class PupperImage extends React.Component {
    render() {
        const imageLink = this.props.imageLink;
        return (
            <img
                src={imageLink}
                alt="A good boy"
            />

        )
    }
}

class ArtistInfoPanel extends React.Component {
    render() {
        return (
            <div id="artist_info_panel">
                <a id="instaB" className='button' href="instagram.com"> I </a>
                <a id="redditB" className='button' href="reddit.com"> R </a>
                <a id="unspB" className='button' href="unsplash.com"> U </a>
                <a id="downlB" className='button' href="google.com"> D </a>
            </div>
        )
    }
}

class PupperButton extends React.Component {
    render() {
        return (
            <div className='button' onClick={this.props.onClick}>
                {this.props.text}
            </div>
        )
    }
}

class ButtonPanel extends React.Component {

    constructor(props) {
        super(props);

        this.handleKiss = this.handleKiss.bind(this);
        this.handlePet = this.handlePet.bind(this);
        this.handleNextPupper = this.handleNextPupper.bind(this);
    }

    handleKiss() {
        // TODO P5 animation here
        alert("You kissed the pupper!");
    }

    handlePet() {
        // TODO P5 animation here
        alert("You pet the pupper!");
    }

    handleNextPupper() {

    }

    render() {
        return (
            <div id="button_panel">
                <PupperButton text="Kiss Pupper!" onClick={this.handleKiss} />
                <PupperButton text="Pet Pupper!" onClick={this.handlePet} />
                <PupperButton text="Next Pupper!" onClick={this.props.nextPupper} />
            </div>
        )
    }
}

class PupperBox extends React.Component {
    constructor(props) {
        super(props);
        // unsplashDatum refers to a single data object from unsplash
        this.state = {
            unsplashDatum: null,
        };
        this.requestRandomPupper = this.requestRandomPupper.bind(this);
    }

    componentDidMount() {
        this.requestRandomPupper();
    }

    // requests a new random datum object from the api
    requestRandomPupper() {
        API.get('/random_pupper')
            .then((response) => {
                this.setState({ unsplashDatum: response.data });
            })
            .catch((error) => {
                // TODO: error handling for different erros
                console.log("Error: " + error.message);
            });
    }

    render() {
        //render the image when it's loaded
        let pupperImage;
        if (this.state.unsplashDatum) {
            pupperImage = <PupperImage imageLink={
                this.state.unsplashDatum.urls.regular
            } />
            this.document.body.background.color = this.state.unsplashDatum.color;

        } else {
            // placeholder
            pupperImage = (
                <p>Loading...</p>
            );
        };
        //TODO pass img object through to PupperImage
        return (
            <div id="content_box">
                {pupperImage}
                <ButtonPanel nextPupper={this.requestRandomPupper} />
                <ArtistInfoPanel />
            </div>
        )
    }
}

class NavigationFooter extends React.Component {
    render() {
        return (
            <div id="footer">
                <a className='button' href='https://joshuas.uber.space/' target='_self' rel='noreffer'>
                    Home
                </a>
                <a className='button' href='https://joshuas.uber.space/imprint.html' target='_self' rel='noreffer'>
                    Imprint
                </a>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <h1>Kissing Puppers!</h1>
                <PupperBox />
                <NavigationFooter />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
