import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import API from './api'


class PupperImage extends React.Component {
    render() {
        const imageLink = this.props.imageLink;
        return (
            <div id="imageFrame">
                <img
                    src={imageLink}
                    alt="A good boy" />
            </div>

        )
    }
}

class ImageInfoPanel extends React.Component {
    render() {
        return (
            <div id="imageInfoPanel">
                <p>Links will go here:</p>
                <ul>
                    <li><a href="instagram.com"> Instagram </a></li>
                    <li><a href="reddit.com"> Reddit </a></li>
                    <li><a href="unsplash.com"> Unsplash </a></li>
                    <li><a href="#"> Download this image </a></li>
                </ul>
            </div>
        )
    }
}

class PupperButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.text}
            </button>
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
            <div id="buttonPanel">
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
                this.state.unsplashDatum.urls.small
            } />
        } else {
            pupperImage = <p id="imageFrame">Loading...</p>
        };
        //TODO pass img object through to PupperImage
        return (
            <div id="foregroundBox">
                {pupperImage}
                <ImageInfoPanel />
                <ButtonPanel nextPupper={this.requestRandomPupper} />
            </div>
        )
    }
}

class NavigationBox extends React.Component {
    render() {
        return (
            <div id="navigationBox">
                <p>Impress | Home | Other Stuff</p>
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
                <NavigationBox />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
