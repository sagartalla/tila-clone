import React from 'react'
import ErrorComp from '../components/common/Error'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const messege = err;
    return { statusCode, messege }
  }

  render() {
    const {statusCode, messege} = this.props;
    return (
      <p>
        <ErrorComp statusCode={statusCode} messege={messege}/>
      </p>
    )
  }
}

export default Error
