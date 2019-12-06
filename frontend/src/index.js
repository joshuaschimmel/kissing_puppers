import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './footer.css';
import API from './api';


class PupperImage extends React.Component {
    render() {
        const image_location = this.props.image_location;
        return (
            <img
                src={image_location}
                alt="A good boy"
            />

        )
    }
}

class ArtistInfoPanel extends React.Component {
    render() {
        const links = this.props.links;
        const user = this.props.user;

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

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        // object containing image metadata and their location
        this.state = {
            image_data: null,
        };
        this.requestRandomPupper = this.requestRandomPupper.bind(this);
    }

    componentDidMount() {
        this.requestRandomPupper();
    }

    // requests a new random datum object from the api
    requestRandomPupper() {
        this.setState({image_data: null});
        API.get('/random_pupper')
            .then((response) => {
                this.setState({ image_data: response.data });
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
                <ButtonPanel nextPupper={this.requestRandomPupper}/>
            </div>
        );

        if (this.state.image_data) {
            const user = this.state.image_data.user;
            const links = this.state.image_data.links;
            // unsplash data loaded, setup depending on it here vvv
            box_content = (
                <div id="content_box">
                    <PupperImage image_location={this.state.image_data.urls.regular}/>
                    <ButtonPanel nextPupper={this.requestRandomPupper}/>
                    <ArtistInfoPanel links={links} user={user}/>
                </div>
            );

            console.log('Datum color: ' + this.state.image_data.color)
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
                <ContentContainer />
                <NavigationFooter />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
