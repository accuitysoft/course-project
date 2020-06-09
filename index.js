require('dotenv').config()
import express from 'express'
import contactFormEntries from './src/contactForm.js'
import users from './src/user.js'
import auth from './src/auth.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/contact_form', contactFormEntries)
app.use('/users', users)
app.use('/auth',auth)

// Handle 404 errors
app.get('*', (req,res,next)=>{
  res.status(404).send({message: "Not found"})
  next();
})

// Global error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err)
  }
  
  return res.status(500).send({error: "Unexpected error found"})
})

export default app.listen(port, () => console.log(`Express server listening on port ${port}.`))
