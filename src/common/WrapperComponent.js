import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";

function WrapperComponent({component: Component, ...rest}) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const urlParams = useParams();
    return (<Component {...rest} navigate={navigate} urlParams={urlParams} form={form} />)
}

export default WrapperComponent;

// The reason I introduced this wrapper component:
// I've used react 17 for this project and react 17 comes with react-router-dom version 6.x.x
// In react-router-dom version 6.x.x, the immediate child of <Route> components no longer receive history object as a prop.
// So we can't use this.props.history.push("/login"); for programmatic navigation.
// withRouter higher-order component is also removed from react-router-dom 6.x.x
// My best chance was to use useNavigate() hook provided by latest react-router-dom
// So I created this functional component and passed navigate function to the wrapped components as a prop
// I also used this wrapper component to pass down antd form by using useForm() hook.
