import App from "./app"
import dotenv from 'dotenv'
dotenv.config()

const app = new App();

const server = app.app.listen(process.env.PORT || 3000, () => {
    console.info(`server has initialized in \n\n http://localhost:3000`)

})

export default server;