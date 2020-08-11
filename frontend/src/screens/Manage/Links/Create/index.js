import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../../../Layouts/Manage';
import { getFormData } from '../../../../helpers/form';
import { linkCreate } from '../../../../actions/LinkActions';


const Create = ({link, linkCreate}) => {

    const submitHandler = (e) => {
        e.preventDefault();
        const data = getFormData(e);
        linkCreate(data);
    };

    if(link){
       return <Redirect to="/manage/links" />
    }

    return(
        <Layout>
            <h1 className="text-center">Create Link</h1>
            <p className="text-center">Enter the name and url of your link.</p>
            <div>
                <form onSubmit={submitHandler} style={{width: "75%", margin: "auto"}}>
                    <div className="form-group">
                        <label>Label</label>
                        <input type="text" className="form-control" name="label" />
                    </div>
                    <div className="form-group">
                        <label>Url</label>
                        <input type="text" className="form-control" name="url" />
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input type="checkbox" name="isSocial" />
                            <span className="form-check-sign"></span>
                            Is Social
                        </label>
                    </div>
                    <div>
                        <button className="btn btn-dark btn-round">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return { link: state.link.link };
};

export default connect(mapStateToProps, { linkCreate })(Create);