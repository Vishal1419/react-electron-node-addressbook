import React from 'react';
import Slide from 'material-ui/transitions/Slide';

const DialogTransition = props => (
	<Slide direction="down" {...props} />
);

export default DialogTransition;
