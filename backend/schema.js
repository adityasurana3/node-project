const zod = require("zod")

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    first_name: zod.string(),
    last_name: zod.string(),
})

const userBody = zod.object({
    password: zod.string().optional(),
    first_name: zod.string().optional(),
    last_name: zod.string().optional()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


module.exports = signupSchema
module.exports = userBody
module.exports = signinBody