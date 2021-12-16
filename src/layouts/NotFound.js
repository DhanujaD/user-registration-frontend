import React from "react";
import { Result, Button } from "antd";
import WrapperComponent from "../common/WrapperComponent";
import "antd/dist/antd.css";

class NotFound extends React.Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => {this.props.navigate(`/dashboard`);}}>Back Home</Button>}
            />
        )
    }
}

const wrappedComponent = () => <WrapperComponent component={NotFound} />;
export default wrappedComponent;