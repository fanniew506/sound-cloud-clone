import React from 'react';
import { Link, hashHistory } from 'react-router';
import Modal from 'react-modal';
import ReactDom from 'react-dom';
import SessionFormContainer from '../session/session_form_container';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, formType: ""};
    this.handleLogOut = this.handleLogOut.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.openSignupModal = this.openSignupModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openLoginModal() {
    this.setState({modalIsOpen: true, formType: "login"});
   }

  openSignupModal() {
    this.setState({modalIsOpen: true, formType: "signup"});
  }

  closeModal() {
  this.setState({modalIsOpen: false});
  }

  handleLogOut() {
    this.props.logout();
    hashHistory.push('/');
  }

  componentDidMount(){
  }
  // const elementH = document.getElementById('header-container');

  render() {
    Modal.setAppElement('body');
    const currentUser = this.props.currentUser;
    if (currentUser === null){
      return(
        <span className="header-container logged-out">
          <header className="header logged-out group">
            <div className='header-logo'>
              <Link to='/'>
              <i className="fa fa-soundcloud" aria-hidden="true"></i>
                <h3 className="logged-out-logo this-one">SOUNDBYTE</h3>
              </Link>
            </div>
            <nav className='header-nav loggedout'>
              <Link to="/login"><h3 className="login this">Log In</h3></Link>
              <h3 className="loggedout or">OR</h3>
              <button onClick={this.openSignupModal} className="createaccount this create"><h3>Create Account</h3></button>
            </nav>
            <Modal isOpen={this.state.modalIsOpen} closeModal={ this.closeModal }>
              <SessionFormContainer formType={this.state.formType}/>
              <button onClick={this.closeModal}><h4>Cancel</h4></button>
            </Modal>
          </header>
        </span>
        );

      } else {
      return (
        <div className="header-container logged-in">
          <header className="header group">
            <div className='header-logo'>
              <Link to='/'>
                  <i className="fa fa-soundcloud" aria-hidden="true"></i>
                  <h2 className="logged-in-logo this-one">HOME</h2>
              </Link>
            </div>
            <nav className='header-nav loggedin'>
              <Link to='/new-track-form'><h3>Upload</h3></Link>
              <Link to='/profile'>
                <img className="profile-thumb" src={currentUser.image_url}/>
                <h3 className="username">
                  {currentUser.username}
                </h3>
              </Link>
              <button onClick={this.handleLogOut}><h3>Log out</h3></button>
            </nav>
          </header>
        </div>
      );
    }

  }
}

export default Navigation;
