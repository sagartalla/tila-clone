import React,{ Component} from 'react'
import routerEvents from 'next-router-events'
import LoadingBar from '../components/common/Loader/skeletonLoader';

const WithLoadingBar = (Child) => {
  return class WithLoadingBar extends Component {
    state={pageLoading:true, pathname:this.props.router.asPath}

    static getInitialProps(ctx) {
      if(Child.getInitialProps) {
        return Child.getInitialProps(ctx)
      }
    }

    render() {
      const { pageLoading, pathname } = this.state;
      const { pageProps} = this.props
      return (
        <div>
          <LoadingBar loadComponent={pageLoading} pathname={pathname} >
            <Child {...this.props} />
          </LoadingBar>
        </div>
      )
    }
    componentWillReceiveProps() {

    }
    componentDidMount() {
      this.setState(() => ({pageLoading:true, pathname:this.props.router.pathname}))
      setTimeout(() => {
        this.setState({pageLoading:false})
      },400)
    }
    componentWillMount() {
      routerEvents.on("routeChangeStart", this.pageLoadStart)
      routerEvents.on("routeChangeComplete",this.pageLoadEnd)
    }
    componentWillUnmount() {
      routerEvents.off("routeChangeStart",this.pageLoadStart)
      routerEvents.off("routeChangeComplete",this.pageLoadEnd)
    }
    pageLoadStart = (url) => {
      const currentUrl = window.location.pathname + window.location.search
      let pathname = url
      if (url !== currentUrl) {

        this.setState(() => ({ pageLoading: true, pathname}))
      }
    }
    pageLoadEnd = () => {
      this.setState({pageLoading:false})
    }
  }
}

export default WithLoadingBar
