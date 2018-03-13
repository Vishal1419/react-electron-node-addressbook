import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles'
import PropTypes from 'prop-types';

class Color extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        }
        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover,
        });
    }

    render() {
        const { theme, color, children } = this.props;
        return (
            React.cloneElement(children, {
                style: {
                    ...children.props.style,
                    color: !children.props.disabled && 
                           theme.palette[color].contrastText,
                    background: !children.props.disabled &&
                                (this.state.hover 
                                ? theme.palette[color].dark
                                : theme.palette[color].main),
                },
                onMouseEnter: this.toggleHover,
                onMouseLeave: this.toggleHover,
            })
        );
    }
}

Color.propTypes = {
    color: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withTheme()(Color);
