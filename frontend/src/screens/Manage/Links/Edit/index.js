import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../../../Layouts/Manage';
import { linkGet, linkUpdate } from '../../../../actions/LinkActions';
import FormGroup from '../../../../components/FormGroup';
import FormCheck from '../../../../components/FormCheck';
import { getFormData } from '../../../../helpers/form';

const Edit = ({ link, linkGet, linkUpdate }) => {
    const { id } = useParams();

    useEffect(() => {
        linkGet(id);
    }, [id, linkGet]);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = getFormData(e);
        linkUpdate( id, data );
    };

    return(
        <Layout>
            <h1 className="text-center">Edit Link</h1>
            <p className="text-center">Update your link information.</p>
            <div>
                <form onSubmit={submitHandler} style={{width: "75%", margin: "auto"}}>
                    <FormGroup label="Label" name="label" data={link} type="text" />
                    <FormGroup label="Url" name="url" data={link} type="text" />
                    <FormCheck label="Is Social" name="Is Social" data={link} />
                    
                    <div>
                        <button className="btn btn-dark btn-round">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        link: state.link.link,
    }
}

export default connect(mapStateToProps, { linkGet, linkUpdate })(Edit);