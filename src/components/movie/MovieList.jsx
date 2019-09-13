import React from 'react'
import ReactTypes from 'prop-types'

export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

static defaultProps = {}
static propTypes = {}

    render() {
        return <div>
            <h1>{this.props.match.params.type}</h1>
            <p>{this.props.match.params.page}</p>
        </div>
    }
}
