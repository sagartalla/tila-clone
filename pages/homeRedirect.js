import Base, { baseActions } from './base';

class HomeRedirect extends Base {
  static async getInitialProps({ query, res }) {
    const { country, language } = query;
    if(res) {
      res.writeHead(302, {
        Location: `/${language}`
      });
      res.end();
    } else {
      Router.push(`/${language}`)
    }
  }
  render() {
    return null;
  }
}

export default HomeRedirect;
