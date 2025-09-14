const bcrypt = require('bcryptjs');
const RECEIVER = require('../models/receiverModel');
const { connectdb } = require('./connectDb');

const createTestNGO = async () => {
    try {
        await connectdb("mongodb://127.0.0.1:27017/userDb");
        
        const testNGO = {
            name: "Test NGO",
            email: "test@ngo.com",
            ngoDarpanID: "NGO123456",
            location: "Test Location",
            description: "Test NGO Description",
            pincode: "123456",
            leader: {
                name: "Test Leader",
                phone: "1234567890",
                email: "leader@ngo.com"
            },
            password: await bcrypt.hash("password123", 10),
            verificationStatus: {
                status: 'Verified',
                message: 'Account verified',
                verifiedAt: new Date()
            }
        };

        const existingNGO = await RECEIVER.findOne({ email: testNGO.email });
        if (!existingNGO) {
            await RECEIVER.create(testNGO);
            console.log('Test NGO created successfully');
        } else {
            console.log('Test NGO already exists');
        }
    } catch (error) {
        console.error('Error creating test NGO:', error);
    }
    process.exit();
};

createTestNGO(); 