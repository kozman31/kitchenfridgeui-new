import React from 'react';
import { connect } from 'react-redux';


  export interface Props {
    loggedIn: boolean;
    user: {
      email:string,
      username:string,
      jwt:string,
    };
  }
  export interface State {
    loggedIn: boolean;
    user: {
      email:string,
      username:string,
      jwt:string,
    };
  }

class PantryList extends React.Component <Props, State>  {

  public render(){
    return (
      <div className="pantry">
        <h2>Pantry</h2>
        <h4>Under Contruction</h4>
        <h5>Logged In?: {this.props.loggedIn.toString()}</h5>
        <h5>User: {this.props.user.username}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state:State) => {
  return {
      user:state.user,
      loggedIn:state.loggedIn
  };
};
export default connect(mapStateToProps,null)(PantryList);