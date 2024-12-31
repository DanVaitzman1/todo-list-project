const User = require("../models/userModel");

const createUser = async (userData) => {
    userData.user_id = await getNextUserId();
    const user = new User(userData);
    await user.save();
    return await getUserById(user.user_id);
};

const getUsers = async () => {
    return User.find({}, "user_id first_name last_name email");
};

const getUserById = async (id) => {
    return User.findOne({ user_id: id }, "user_id first_name last_name email");
};

const getUserByEmail = async (email) => {
    return User.findOne({ email: email });
};

const deleteUser = async (id) => {
    return User.findByIdAndUpdate(id, { isDeleted: true });
};

const getNextUserId = async () => {
    const maxUserIdDoc = await User.findOne().sort({ user_id: -1 });
    const maxUserId = maxUserIdDoc ? maxUserIdDoc.user_id : 0;
    return maxUserId + 1;
}

module.exports = { createUser, getUsers, getUserById, getUserByEmail, deleteUser };
