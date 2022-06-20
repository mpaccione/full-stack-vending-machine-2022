const catchErr = (err) => {
    console.error(err);
    return res.status(500).json({ message: err })
}

module.exports = {
    catchErr
}