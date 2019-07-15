import React, { Component } from 'react'
import Play from './Play'
import Pause from './Pause'

// thanks: https://gist.github.com/tchardin/ed551c191c5869092128b93fa8705b98

class Player extends Component {

	constructor(props) {
		super(props)
		this.state = {
			playing: false
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKey);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKey);
	}

	handleKey = e => {
		if(e.keyCode === 80) {
			this.handlePlayerClick();
		}
	}

	handlePlayerClick = () => {
		this.setState({ playing: !this.state.playing }, () => this.props.onUpdate(this.state.playing))
	}

	render() {
		return (
			<div className="player" >
				{this.state.playing ? <Pause onPlayerClick={this.handlePlayerClick} /> : <Play onPlayerClick={this.handlePlayerClick} />}
			</div>
		)
	}
}

export default Player
