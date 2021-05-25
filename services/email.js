const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailServices {
    #sender = sendgrid
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3000'
                break;
            case 'production':
                this.link = 'link for production'
                break;
            default:
                  this.link = 'http://localhost:3000'
                break;
                
        }
    }
    #createTamplateVefidyEmail(verifyToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
    theme: 'default',
    product: {
        name: 'ContactsAPI',
        link: this.link
    }
        });
        
        const email = {
    body: {
        name,
        intro: 'Welcome to ContactsAPI! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with ContactsAPI, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: `${this.link}/api/user/verify/${verifyToken}`
            }
        },
    }
};
 

const emailBody = mailGenerator.generate(email);
        return emailBody;
    }

    async sendVerifyEmail(verifyToken, email, name) {
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: email, // Change to your recipient
  from: 'sender fron SendGrid', // Change to your verified sender
  subject: 'Verify email',
  html: this.#createTamplateVefidyEmail(verifyToken, name),
}

 this.#sender.send(msg)
    }
}


module.exports =  EmailServices   