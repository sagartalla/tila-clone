import React from 'react'
import ErrorComp from '../components/common/Error/errors'

class Error extends React.Component {
  static getInitialProps({ res, err }) {    
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {      
    return (
      <p>
        <ErrorComp statusCode={this.props.statusCode}/>
      </p>
    )
  }
}

export default Error
