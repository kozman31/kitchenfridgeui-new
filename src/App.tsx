import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStarOfLife, faPepperHot } from '@fortawesome/free-solid-svg-icons'

library.add( faStarOfLife, faPepperHot)
class App extends React.Component  {
  public render(){
    return (
      <div className="App">
        <h2>Under Contruction</h2>
      </div>
    );
  }
}

export default App;
