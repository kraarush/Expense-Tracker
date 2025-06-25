const refineUser = (user) => {
    if (!user) return null;

    const userObject = user.toObject();

    return {
        _id: userObject._id,
        fullname: userObject.fullname,
        email: userObject.email,
    };
};

export default refineUser;