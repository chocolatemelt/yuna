import React, { Component } from 'react';
import { connect } from 'react-redux';

class CharacterSheet extends Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	character: state.character.current,
});

export default connect(mapStateToProps)(CharacterSheet);
