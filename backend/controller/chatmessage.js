const Conversation = require('../model/conversationmodel');
const Message = require('../model/messagechat');
const User = require('../model/signup');
const { getReceiverSocketId ,io} = require('../socket/socket');

exports.sendMessage = async (req, res) => {
    try {
        const { userId: senderId } = req.user;
        // Assuming req.user contains the user ID
        const receiverId = req.params.id;

        const { message } = req.body;
       
        // Check if conversation exists, create if not
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create and save new message
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();

        // Update conversation with new message ID
        conversation.messages.push(newMessage._id);
        await conversation.save();
        
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId)
        {//io.to is an event to send to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json({ newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to create message', error: error.message });
    }
};
exports.getLastSeen = async (req, res) => {
    try {
        const userId = req.user.userId;
        const sidebarUsers = await User.find({ _id: { $ne: userId } }, 'fullName profileImage gender');

        // Array to store sidebar users and their last seen data
        const sidebarWithLastSeen = [];

        for (const sidebarUser of sidebarUsers) {
            const conversation = await Conversation.findOne({
                participants: { $all: [userId, sidebarUser._id] }
            }).populate("messages");

            if (!conversation) {
                return res.status(404).json({ message: 'Conversation not found' });
            }
            console.log("message length",conversation.messages.length);

            // Extract last message timestamp from the conversation
            const lastMessageTimestamp = conversation.messages.length > 0 ?
                conversation.messages[conversation.messages.length-1].timestamp :
                null;

                const formattedLastSeenTime = new Date(lastMessageTimestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                console.log("check last message",conversation.messages[conversation.messages.length-1]);

            // Push sidebar user with last seen data to the array
            sidebarWithLastSeen.push({
                user: sidebarUser,
                lastSeen: formattedLastSeenTime
            });
        }

        res.status(200).json(sidebarWithLastSeen);
    } catch (error) {
        console.error('Error fetching last seen data:', error);
        res.status(500).json({ message: 'Failed to fetch last seen data' });
    }
};



exports.getMessages = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const receiverId = req.params.id;

        // Find conversation between sender and receiver and populate messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        // Extract messages from the conversation
        const messages = conversation.messages;

        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
};


exports.sidebarUser = async (req, res) => {
    try {
        // Assuming you have the user ID available in req.user.user_id
        const userId = req.user.userId;
        

        // Query all users except the current user
        const sidebarUsers = await User.find({ _id: { $ne: userId } }, 'fullName profileImage gender');
 // Exclude the current user


        // Send the list of sidebar users as a response
        res.status(200).json(sidebarUsers);
    } catch (error) {
        console.error('Error fetching sidebar users:', error);
        res.status(500).json({ message: 'Failed to fetch sidebar users' });
    }
};

