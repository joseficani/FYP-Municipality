const Event = require("../models/event.model");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("getAllEvents error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("getEventById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      type: "official", // ✅ force it
    };

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("createEvent error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedPayload = { ...req.body };

    if (
      updatedPayload.type &&
      updatedPayload.type !== "citizen"
    ) {
      updatedPayload.suggestedBy = "";
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updatedPayload, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("updateEvent error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("deleteEvent error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

exports.updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.status = status;
    const updatedEvent = await event.save();

    res.status(200).json({
      success: true,
      message: "Event status updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("updateEventStatus error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event status",
      error: error.message,
    });
  }
};