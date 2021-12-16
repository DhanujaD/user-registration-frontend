function login (values, sendApiRequest, navigate, handleError) {
    sendApiRequest('post', "login", values)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "currentUser",
                JSON.stringify(response.data.user)
            );
            navigate("/dashboard");
        })
        .catch((error) => {
            handleError(error.response);
        });
};

export default login;