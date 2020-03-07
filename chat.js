class Helpers{
    static apiUrl = '/perfileva/';
    static headers = () => ({
        'Content-Type': 'application/json',
        'Application-Type': 'application/json'
    });
}
class createElement{
    constructor(app){
    //  const app = document.getElementById('app');
     this.createForm(app);
     this.createMain(app);
     console.log(app)
 
    }
     createForm(app){
         const form = document.createElement('form');
         app.appendChild(form)
         const loginInput = document.createElement('input');
         loginInput.type = 'text';
         loginInput.name = 'login';
         loginInput.required = 'required';
         form.appendChild(loginInput)

         const passwordInput = document.createElement('input');
         passwordInput.type = 'password';
         passwordInput.name = 'password';
         passwordInput.required = 'required';
         form.appendChild(passwordInput)

         const submitInput = document.createElement('input');
         submitInput.type = 'submit';
         submitInput.value = 'Войти';
         submitInput.id = 'login';
         form.appendChild(submitInput)

     }

     createMain(app){
        const main = document.createElement('main');
        app.appendChild(main)
        
        const sectionUsers = document.createElement('section');
        sectionUsers.classList.add("users")
        main.appendChild(sectionUsers)
        
        const sectionChat = document.createElement('section');
        sectionChat.classList.add("chat")
        main.appendChild(sectionChat)

        const divMessages = document.createElement('div');
        divMessages.classList.add("messages")
        divMessages.setAttribute("id", "messages");
        sectionChat.appendChild(divMessages)

        const divMessage = document.createElement('div');
        divMessage.classList.add("message")
        sectionChat.appendChild(divMessage)

        const inputFrom = document.createElement('input');
        inputFrom.setAttribute("id", "from");
        inputFrom.type = 'hidden';
        divMessage.appendChild(inputFrom)


        const inputTo = document.createElement('input');
        inputTo.setAttribute("id", "to");
        inputTo.type = 'hidden';
        divMessage.appendChild(inputTo)
        
        const textArea = document.createElement('textarea');
        textArea.setAttribute("id", "message");
        divMessage.appendChild(textArea)

        const button = document.createElement('button');
        button.setAttribute("id", "submit_message");
        button.innerHTML = "Oтправить";
        divMessage.appendChild(button)

     }
     
 }
 const test = new createElement(document.getElementById('app'));

class Chat {
    from = ''; //свойство|поле
    to = '';
    token = '';
    lastUpdate = new Date();

    constructor() {
        // this.lastUpdate = new Date;
    }
    login(login, password) {//метод|действие
        const self = this;
        fetch(
            Helpers.apiUrl + 'login.php',
            {
                method: 'post',
                headers: Helpers.headers(),
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            }
        ).then(function (res) { return res.json() }).then(function (res) {

            self.token = res.token;
            self.from = login;

            // debugger

            // document.getElementById('from').value = document.getElementsByName('login')[0].value;
        }).catch(function (err) {
            console.log(err);
        });
    }

    changeDialog(to) {
        // this.classList.add('active');
        // document.getElementById('to').value = this.innerText;
        this.to = to;

        return fetch(
            Helpers.apiUrl + 'messages.php?from=' + this.from + '&to=' + this.to,
            {
                method: 'get',
                headers: Helpers.headers()
            }
        ).then(function (res) { return res.json() })
            .catch(function (err) { console.log(err) });

    }
    sendMessage(text) {
        fetch(
            Helpers.apiUrl + 'message.php',
            {
                method: 'post',
                headers: Helpers.headers(),
                body: JSON.stringify({
                    from: this.from,
                    to: this.to,
                    message: text
                })
            }
        ).catch(function (err) { console.log(err) });
    }

    getNewMessages = () => new Promise((resolve, reject) => {
        fetch(
            Helpers.apiUrl + 'now_messages.php?from=' + this.from + '&to=' + this.to + '&datetime=' + this.lastUpdate.getTime(),
            {
                method: 'get',
                headers: Helpers.headers()
            }
        ).then(res => res.json()).then((res) => {
            if (res.messages.length > 0) {
                this.lastUpdate = new Date();
            }
            return resolve(res.messages);
        }).catch(err => reject(err));
    });

}

const chat = new Chat();
document.getElementById('login').addEventListener('click', function (event) {
    event.preventDefault();
    chat.login(
        document.getElementsByName('login')[0].value,
        document.getElementsByName('password')[0].value
    );
});

[...document.getElementsByClassName('user')].map(function (item) {
    item.addEventListener('click', function () {
        [...document.getElementsByClassName('user')].map(function (el) {
            el.classList.remove('active');
        });
        this.classList.add('active');
        // document.getElementById('to').value = this.innerText;


        chat.changeDialog(this.innerText).then(function (res) {
            document.getElementById('messages').innerHTML = '';
            for (const item of res.messages) {
                const el = document.createElement('div');
                el.classList.toggle(item.myself ? 'from' : 'to')
                el.innerText = item.text;
                document.getElementById('messages').appendChild(el);
                // lastUpdate = new Date();
            }

        });
    });
});

document.getElementById('submit_message').addEventListener('click', function (event) {
    const text = document.getElementById('message').value;
    const message = document.createElement('div');
    message.innerText = text;
    message.classList.add('from');
    document.getElementById('messages').appendChild(message);
    document.getElementById('message').value = '';
    chat.sendMessage(text);
    console.log(text)
});

const id = setInterval(
    function () {

        if (!!chat.from && !!chat.to) {
            chat.getNewMessages().then(function (messages) {
                for (const item of messages) {
                    const el = document.createElement('div');
                    el.classList.add(item.myself ? 'from' : 'to')
                    el.innerText = item.text;
                    document.getElementById('messages').appendChild(el);
                }
            }).catch(function (err) { console.log(err) })
        }
    },
    3000
);




console.log(chat.from);
console.log(chat.to);
chat.login();


class privateChat extends Chat{
    constructor(){
        super();
    }

    login = (login, password) => {
        
        password = some_cript(password);
        super.login(login, password);
        console.log('private');
        //code
    }
}
class newChat extends privateChat{

}

// const privateChat = new privateChat();

// privateChat.login()
// privateChat.getNewMessages();

// new ar = [new privateChat() , new NewChat()]; 
// for(const el of ar){
//     el.login('','');
// }



