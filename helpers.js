const textFilter = function(req, file, cb) {
    // Accept text files only
    if (!file.originalname.match(/\.(txt|TXT)$/)) {
        req.fileValidationError = 'Only txt files are allowed!';
        return cb(new Error('Only txt files are allowed!'), false);
    }
    cb(null, true);
};

exports.textFilter = textFilter;