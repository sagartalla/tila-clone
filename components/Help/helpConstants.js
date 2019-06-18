/*eslint-disable*/
import ErrorsPart from '../../components/common/Error'
import Faq from './Faq';
import Answers from './Answers';
import Incidents from './Incidents';

const ContactTabs = [
  { type: 'email', icon: '', text: ['Want to mail us ?', 'Email us now'], isClickable: true },
  { type: 'chat', icon: '', text: ['Want to chat ?', 'Chat with us now'], isClickable: true },
  { type: 'call', icon: '', text: ['Phone Support', 'Call us at 1800 0000'], isClickable: false }
]

const helpComponents = (type) => {
  switch(type){
    case 'faq': 
      return (url, categoriesObj, query, isLoggedIn, renderContactCard, handleContactClick) => 
        <Faq url={url} categoriesObj={categoriesObj} query={query} isLoggedIn={isLoggedIn}/>
    case 'answers': 
      return (url, categoriesObj, query, isLoggedIn, renderContactCard, handleContactClick) => 
        <Answers url={url} categoriesObj={categoriesObj} query={query} isLoggedIn={isLoggedIn} renderContactCard={renderContactCard} handleContactClick={handleContactClick}/>
    case 'incidents': 
      return (url, categoriesObj, query, isLoggedIn, renderContactCard, handleContactClick) => 
        <Incidents query={query} />
    default: return () => <ErrorsPart />
  }
}

const Issues = [
  { id: 1, q: 'Issue 1', a: 'This is the solution', orderRelated: true, category: 2 }, 
  { id: 2, q: 'Issue 2', a: 'This is the solution', orderRelated: false, category: 5 },
  { id: 3, q: 'Issue 3', a: 'This is the solution', orderRelated: true, category: 3 }
]

const countryLanguageHelpCode = {
  "ARE": 1,
  "SAU": 2,
  "en": 3,
  "ar": 4
}

const categoryImages = {
  1: 'help_orders',
  8: 'help_rer',
  10: 'help_payments',
  55: 'help_warranty'
}
export {ContactTabs, helpComponents, Issues, countryLanguageHelpCode, categoryImages}