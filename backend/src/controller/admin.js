const User = require('../schema/user');

const addUserController = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

const mapUsersController = async (req, res) => {
    const { participantId, supervisorId, peersIds, juniorsIds } = req.body;
  
    try {
      const participant = await User.findById(participantId);
      
      if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
      }
  
      participant.supervisor = supervisorId;
      participant.peers = peersIds;
      participant.juniors = juniorsIds;
  
      await participant.save();
      res.status(200).json({ message: 'Users mapped successfully', participant });
    } catch (error) {
      res.status(500).json({ message: 'Error mapping users', error });
    }
  };
  

module.exports = {
  addUserController,
  mapUsersController
};
