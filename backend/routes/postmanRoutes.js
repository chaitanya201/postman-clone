const router = require("express").Router();
const headerModel = require("../db/schemas/headers");
const requestModel = require("../db/schemas/request");
const mongoose = require("mongoose");

router.get("/get", async (req, res) => {
  const id = req.query.id;
  if (id) {
    try {
      const request = await requestModel.findById(id);
      const headers = await headerModel.findOne({ requestId: id });
      return res.json({ status: true, data: { headers, request } });
    } catch (error) {
      console.log("error...", error);
      return res.json({
        status: false,
        data: { headers: null, request: null },
      });
    }
  }
  try {
    const allRequests = await requestModel.find({});
    const headers = await Promise.allSettled(
      allRequests.map((request) => {
        return headerModel.findOne({ requestId: request._doc._id });
      })
    );
    const finalResult = allRequests.map((request) => {
      const correctHeaders = headers.filter((header) => {
        return `${header.value.requestId}` === `${request._doc._id}`;
      });
      return {
        ...request._doc,
        headers: correctHeaders[0].value.headers,
      };
    });
    return res.json({ status: true, data: finalResult });
  } catch (error) {
    console.log("error...", error);
    return res.json({
      status: false,
      data: { headers: null, request: null },
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const body = req.body;
    const session = await mongoose.startSession();
    const sessionResult = await session.withTransaction(async () => {
      const request = await requestModel.create({
        title: body.title,
        description: body.description,
        url: body.url,
        method: body.method,
      });
      const headers = await headerModel.create({
        requestId: request._id,
        headers: body.headers,
      });
      return { headers, request };
    });

    await session.endSession();
    return res.json({
      status: true,
      data: sessionResult,
    });
  } catch (error) {
    console.log("error...", error);
    return res.json({ status: false, error: error });
  }
});

router.post("/update", async (req, res) => {
  try {
    const body = req.body;
    const session = await mongoose.startSession();
    const sessionResult = await session.withTransaction(async () => {
      const request = await requestModel.findOneAndUpdate(
        { _id: body._id },
        {
          title: body.title,
          description: body.description,
          url: body.url,
          method: body.method,
        }
      );
      const headers = await headerModel.findOneAndUpdate(
        { requestId: body._id },
        {
          headers: body.headers,
        }
      );
      return { headers, request };
    });

    await session.endSession();
    return res.json({
      status: true,
      data: sessionResult,
    });
  } catch (error) {
    console.log("error...", error);
    return res.json({ status: false, error: error });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const body = req.body;
    const session = await mongoose.startSession();

    const sessionResult = await session.withTransaction(async () => {
      const request = await requestModel.deleteOne(
        {
          _id: body._id,
        },
        { session }
      );

      if (request.deletedCount === 0 && request.acknowledged) {
        return session.abortTransaction();
      }

      const headers = await headerModel.deleteOne(
        {
          requestId: "65bc56ce0b5d1bfff2588834",
        },
        { session }
      );

      if (headers.deletedCount === 0 && headers.acknowledged) {
        return session.abortTransaction();
      }

      return { headers, request };
    });

    await session.endSession();
    if (!sessionResult) {
      return res.json({
        status: false,
        data: null,
      });
    }
    return res.json({
      status: true,
      data: sessionResult,
    });
  } catch (error) {
    console.log("error...", error);
    return res.json({ status: false, error: error });
  }
});

module.exports = router;
