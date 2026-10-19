const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
    };
    if (data.meta) {
        responseData.meta = data.meta;
    }
    if (data.data !== undefined) {
        responseData.data = data.data;
    }
    res.status(data.statusCode).json(responseData);
};
export default sendResponse;
