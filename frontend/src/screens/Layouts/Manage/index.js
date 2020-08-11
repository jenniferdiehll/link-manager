import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../../actions/AccountActions';
import { Redirect, Link } from 'react-router-dom';

const Layout = ({ children, signOut, account }) => {

    if(!account){
        return <Redirect to="/sign-in" />
    }

    const signOutHandler = (e) => {
        e.preventDefault();
        signOut();
    }
    
    function goBack(){
        window.history.back();
    }

    return(
        <div className="layout">
            <nav className="navbar navbar-expand-lg bg-dark text-light">
                <div className="container d-flex w-100 justify-content-between">
                    <div>
                        <button className="btn btn-clear" onClick={goBack}>Back</button>
                    </div>
                    <div className="text-center">
                        <Link to="/manage/links" className="btn btn-clear">Links</Link>
                    </div>
                    <div>
                        <button className="btn btn-clear" onClick={signOutHandler}>Exit</button>
                    </div>
                </div>
            </nav>
            <div className="container">{children}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return{ account: state.account.account }
}

export default connect(mapStateToProps, { signOut })(Layout);