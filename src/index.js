import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './footer.css';
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
        const user = this.props.datum.user;
        const links = this.props.datum.links;

        // TODO: check for better pattern
        // only show links to profiles if they exis
        let user_name = <p>Finding artist data...</p>;
        let twitter = null;
        let instagram = null;
        let unsplash = null;
        let download = null;

        if (user) {
            user_name = <p>{user.name}</p>
            twitter = <a id="twitter" className='button'
                href={"https://twitter.com/" + user.twitter_username}
                target="_blank"
                rel="noopener noreferrer">
                twitter
                </a>

            instagram = <a id="instagram" className='button'
                href={"https://instagram.com/" + user.instagram_username}
                target="_blank"
                rel="noopener noreferrer">
                instagram
                </a>

            unsplash = <a id='unsplash' className='button'
                href={links.html}
                target="_blank"
                rel="noopener noreferrer">
                unsplash
                </a>

            download = <a id='download' className='button'
                href={links.download}
                target="_blank"
                rel="noopener noreferrer">
                download
                </a>
        }

        return (
            <div id="artist_info_panel">
                {user_name}
                <div>
                    {twitter}
                    {instagram}
                    {unsplash}
                    {download}
                </div>
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
        let box_content = (
            <div id="content_box">
                <p>Loading...</p>
            </div>
        );
        

        if (this.state.unsplashDatum) {
            // unsplash data loaded, setup depending on it here vvv
            box_content = (
                <div id="content_box">
                    <PupperImage imageLink={this.state.unsplashDatum.urls.regular}/>
                    <ButtonPanel nextPupper={this.requestRandomPupper}/>
                    <ArtistInfoPanel datum={this.state.unsplashDatum}/>
                </div>
            );

            console.log('Datum color: ' + this.state.unsplashDatum.color)
        };

        return box_content;
    }
}

class NavigationFooter extends React.Component {
    render() {
        return (
            <div id="footer">
                <a className='footer_link' href='https://joshuas.uber.space/' target='_self' rel='noreffer'>
                    Home
                </a>
                <a className='footer_link' href='https://joshuas.uber.space/imprint.html' target='_self' rel='noreffer'>
                    Imprint
                </a>
            </div>
        );
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
