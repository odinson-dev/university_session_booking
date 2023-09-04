const Slot = require('./schema')

class Controller {

    getAvailableSession = async(req, res) => {
        // Fetch and return list of available dean sessions
        const deanSessions = await Slot.find({ week: "1", deanId: { $exists: true } });
        res.json(deanSessions);
    }

    bookSession = async(req, res) => {
        const { week, day, deanId } = req.body;
            
        // Check session availability and book the session for the student
        const session = await Slot.findOne({"week" : week, "day" : day, "deanId" : deanId});
        if (session && !session.studentId) {
            const studentId = req.userId;
            await Slot.updateOne({week, day, deanId}, {"$set" : {"studentId" : studentId}});
            res.json({ message: 'Session booked successfully' });
        } else {
            res.status(400).json({ message: 'Session not available or already booked' });
        }
        
    }
    
    getPendingSession = async (req, res) =>{
        const pendingSessions = await Slot.find({ deanId: req.userId, studentId: { $exists: true } })
            .populate('studentId');
        
        res.json(pendingSessions);
    }
}

module.exports = new Controller();