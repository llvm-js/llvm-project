function validParameter(param) {
    return ![Infinity, NaN, -Infinity, null, undefined].includes(param);
}

module.exports = validParameter;