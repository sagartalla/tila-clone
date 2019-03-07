import axios from 'axios';

var remoteComponents = [
  {
    name: 'SimpleComponent',
    src: '/build/simpleComponent.js'
  },
  {
    name: 'GreeterComponent',
    src: '/build/greeterComponent.js',
    props: {name: 'Bob'}
  }
];

var loadRemoteComponent = function(component) {
  axios.get(component.styles)
    .then(({data: css}) => {
      var style = document.createElement('style')
      style.type = 'text/css'
      style.appendChild(document.createTextNode(css))
      document.head.appendChild(style)
    });
  return axios.get(component.src)
    .then(({data: remoteComponentSrc}) => {
      let DynamicComponent;
      (function(){
        window.eval('function remoteComponetWrapper(' + Object.keys(component.context).join(', ') + ', name){' + remoteComponentSrc + ' \n return eval(name);}');
        DynamicComponent = remoteComponetWrapper(...[...Object.values(component.context), component.name]);
      })();
      return { name: DynamicComponent, props: component.props || {} };
    });
};

var loadRemoteComponents = function(components) {
  return Promise.all(
    _.map(components, function(component) {
      console.log(component.name, component.src);
      return loadRemoteComponent(component);
    })
  );
};

export default { loadRemoteComponents };
