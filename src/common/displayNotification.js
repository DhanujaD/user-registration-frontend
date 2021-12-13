import { notification } from "antd";

function displayNotification(type, message) {
    const openNotificationWithIcon = type => {
        notification[type]({
          message: type.toUpperCase(),
          description: message,
        });
      };
    openNotificationWithIcon(type);

}

export default displayNotification;