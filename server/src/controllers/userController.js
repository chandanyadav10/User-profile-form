import User from "../models/user.model.js";

// create a new user
export const createUser = async (req, res) => {
  try {
    const {
      email,
      username,
      ...userData
    } = req.body || {};
    const profilePhoto = req.file?.path; // multer handles this

    console.log(req.body, "req.body" ,profilePhoto);
    if (!email, !username, !profilePhoto) {
      return res.status(400).json({ message: 'Email, username, and profile photo are required' });
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({
      email,
      username,
      profilePhoto,
      ...userData,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// check if a username is available
export const checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ message: 'Username already exists' });
        res.status(200).json({ message: 'Username is available' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}