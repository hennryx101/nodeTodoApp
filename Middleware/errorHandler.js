const errorHandler = (err) => {
    console.log(err.message, err.code);
    let errors = {todo: ''}

    // validation errors
    if(err.message.includes('Todo validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    if(err.message.includes('Validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports = errorHandler;