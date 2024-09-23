//success
export const setResponse = (data, res) => {
    res.status(200);
    res.json(data);
}

//failure
export const setError = (err, res) => {
    res.status(500);
    res.json({
        'error': {
            'code': 'Internal Server Error',
            'message': `Error occured while processing the request ${err}`
        }
    })
}