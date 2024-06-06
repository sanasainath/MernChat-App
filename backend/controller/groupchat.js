// controllers/groupController.js
const Group=require('../model/group')
const GroupMessage=require('../model/groupmessages');
const socket = require('../socket/socket');
const {io} = require('../socket/socket');
// Controller function to create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const ownerId = req.user.userId; // Get the user ID of the owner

    // Check if a group with the same name already exists
    const existingGroup = await Group.findOne({ name });

    if (existingGroup) {
      // If a group with the same name exists, return an error
      return res.status(400).json({ message: 'A group with the same name already exists' });
    }

    // Create the group with the owner included in the members
    const group = await Group.create({
      name,
      owner: ownerId, // Set the owner of the group
      members: [ownerId, ...members] // Include the owner in the members array
    });
    io.emit('newGroupCreated',group);

    res.status(201).json({ group });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Failed to create group', error: error.message });
  }
};

exports.addUserToGroup = async (req, res) => {
  try {
    const { groupId, userIdToAdd } = req.body;
    const ownerId = req.user.userId; // Assuming the user ID is available in the request

    // Check if the current user is the owner of the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    if (group.owner.toString() !== ownerId) {
      return res.status(403).json({ message: 'Only the group owner can add members' });
    }

    // Add the user to the group's members
    group.members.push(userIdToAdd);
    await group.save();

    res.status(200).json({ message: 'User added to group successfully' });
  } catch (error) {
    console.error('Error adding user to group:', error);
    res.status(500).json({ message: 'Failed to add user to group', error: error.message });
  }
};

// exports.createGroupMessage = async (req, res) => {  
//   try {
//     const { group, message } = req.body;
//     const senderId = req.user.userId; // Assuming sender ID is available in req.user.userId
//     const senderName = req.user.fullName; // Function to retrieve sender's name based on ID

//     // Create a new GroupMessage document
//     const newGroupMessage = new GroupMessage({
//       group,
//       sender: {
//         id: senderId,
//         name: senderName,
//       },
//       message,
//     });
//     const groups = await Group.findById(group).populate('members', '_id');
//     console.log("really chekcing",groups);
//     // Save the new group message to the database
//     await newGroupMessage.save();
//     groups.members.forEach((member) => {
//       const receiverSocketId = getReceiverSocketId(member._id); // Get receiver's socket ID
//       console.log("socket id of Group",receiverSocketId);
//       if (receiverSocketId && io.sockets.sockets[receiverSocketId]) {
//         io.to(receiverSocketId).emit('newGroupMessage',newGroupMessage);
//       }
//     });

  

//     // Respond with the newly created group message as an array
//     res.status(201).json([newGroupMessage]); // Wrap the message in an array

//   } catch (error) {
//     console.error('Error creating group message:', error);
//     res.status(500).json({ message: 'Failed to create group message', error: error.message });
//   }
// };
exports.createGroupMessage = async (req, res) => {  
  try {
      const { group, message } = req.body;
      const senderId = req.user.userId;
      const senderName = req.user.fullName;

      const newGroupMessage = new GroupMessage({
          group,
          sender: {
              id: senderId,
              name: senderName,
          },
          message,
      });
      
      await newGroupMessage.save();
      
      // Emit the new group message to the group room
      console.log('Emitting newGroupMessage:', newGroupMessage);
      io.emit('newGroupMessage', newGroupMessage);

      res.status(201).json([newGroupMessage]);
  } catch (error) {
      console.error('Error creating group message:', error);
      res.status(500).json({ message: 'Failed to create group message', error: error.message });
  }
};



exports.getUserGroupNames = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming the user ID is available in the request
    
    // Query the database to retrieve group names and IDs where the user is a member
    const userGroups = await Group.find({ members: userId }).select('name _id');
    
    // Send the group names and IDs as a response
    res.status(200).json(userGroups);
  } catch (error) {
    console.error('Error fetching group names for user:', error);
    res.status(500).json({ message: 'Failed to fetch group names for user', error: error.message });
  }
};

// controllers/groupController.js


exports.getGroupData = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    // Retrieve group data by ID
    const groupData = await Group.findById(groupId);

    if (!groupData) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Fetch messages associated with the group
    const messages = await GroupMessage.find({ group: groupId });

    // Attach messages to the group data
   

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching group data:', error);
    res.status(500).json({ message: 'Failed to fetch group data', error: error.message });
  }
};

// Express route to retrieve all members of a group
exports.getMembersGroup=async (req, res) => {
  try {
      const groupId = req.params.groupId;
      // Fetch group information from the database
      const group = await Group.findById(groupId);
      if (!group) {
          return res.status(404).json({ message: 'Group not found' });
      }
      // Retrieve member IDs or user information from the group
      const members = group.members;
      
      res.status(200).json(members);
  } catch (error) {
      console.error('Error retrieving group members:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

