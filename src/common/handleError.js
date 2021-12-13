import { notification } from "antd";

function handleError(error) {
    const openNotificationWithIcon = type => {
        notification[type]({
          message: `Error ${error.status}`,
          description: error.data,
        });
      };
    openNotificationWithIcon('error');

}

export default handleError;