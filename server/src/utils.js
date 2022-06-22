const catchErr = (err, res) => {
    console.error(err);
    return res.status(500).json({ message: err })
}

module.exports = {
    catchErr
}