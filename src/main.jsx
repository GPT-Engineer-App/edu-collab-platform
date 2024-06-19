import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store';

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

// index.css
/*
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

button, a, input, select, textarea {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

button:focus, a:focus, input:focus, select:focus, textarea:focus {
  outline: 2px solid #005fcc;
}

.high-contrast {
  color: #000;
  background-color: #fff;
}

.interactive-element {
  tabindex: 0;
}
*/