import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LanguageContainer from './LanguageContainer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LanguageContainer />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
