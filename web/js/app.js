window.ee = new EventEmitter();

let users = [
    {
        userId : '001',
        userPic : 'img/content/user.jpg',
        name : "Eugene Alitz"
    },
    {
        userId : '002',
        userPic : 'img/content/ava.jpg',
        name : "Amad Sergin"
    }
];
let my__messages=JSON.parse(localStorage.getItem('messages'));

const Message = React.createClass({
    propTypes : {
        data : React.PropTypes.shape({
            // userId : React.PropTypes.string.isRequired,
            // userPic : React.PropTypes.string.isRequired,
            msgText : React.PropTypes.string.isRequired,
        })
    },
    
    render : function () {
        let userId = this.props.data.user.userId,
            userPic = this.props.data.user.userPic,
            msgText = this.props.data.msgText;
        
        return (
            <div
                className={"chat__message_wrapper " + (userId != '001' ? "chat__message_right" : " chat__message_display")}>
                <div className="chat__user_avatar">
                    <a href="#">
                        <img src={userPic}
                             className="md__user_image" alt=""
                        />
                    </a>
                </div>
                <ul className="chat__message">
                    <li className="chat__message_text">
            <span className="chat__message_content">
                {msgText}
            </span>
                    
                    </li>
                </ul>
            </div>
        
        )
    }
});

const ChatContent = React.createClass({
    propTypes : {
        data : React.PropTypes.array.isRequired
    },
            
    render : function () {
        let data = this.props.data;
        let msgTemplate;
        if (data.length > 0) {
            msgTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Message data={item}/>
                    </div>
                )
            })
        }
        return (
            <div
                className="chat__wrapper chat__box_wrapper chat__box_active"
                id="chat">
                <div className="chat__content">
                    {msgTemplate}
                </div>
            </div>
        )
    }
});

const ChatSubmit = React.createClass({
    
    onSubmitHandler : function (e) {
        e.preventDefault();
        let msgBlock = ReactDOM.findDOMNode(this.refs.msgText),
            messageText = msgBlock.value;
        
        let message = [{
            msgText : messageText,
            user : users[0]
        }];
        window.ee.emit('Message.add', message);
        
        let responce;
        $.post('/api/get-answer',
            {
                q : messageText
            })
            .done(function (resp) {
                if (resp.ok) {
                    responce = resp.a;
                    // alert(responce);
                    message = [{
                        msgText : responce,
                        user : users[1]
                    }];
                    window.ee.emit('Message.add', message);
                }
                else {
                    alert(resp.error);
                }
            });
        
        msgBlock.value = '';
    },
    
    render : function () {
        return (
            <div className="chat__submit_box">
                <div className="uk__input_group">
                    <div className="gurdeep__chat_box">
                        <textarea
                            ref="msgText"
                            className="md-input"
                            name="submit_message"
                            id="submit__message"
                            rows="1"
                            cols="25"
                            placeholder="Type a message">
                        </textarea>
                        <span className="uk__input_group-addon">
                          <a href="#"
                             onClick={this.onSubmitHandler}
                             className="submit__btn">
                            <i className="fa fa-send"/>
                          </a>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
});

const ChatBlock = React.createClass({
    getInitialState : function () {
        return {
            messages : my__messages
        };
    },
    
    componentDidMount : function () {
        let self = this;
        let sMessages;
        window.ee.addListener('Message.add', function (message) {
            let nextMessage = (self.state.messages).concat(message);
            self.setState({messages : nextMessage});
            sMessages=JSON.stringify(self.state.messages);
            localStorage.setItem('messages',sMessages);
            
            
        })
    },
    
    componentWillUnmount : function () {
        window.ee.removeListener('Message.add');
        
    },
    render : function () {
        
        return (
            <div>
                <div id="chat__block"
                     className="chat__block ">
                    <div className="chat__head">
                        <div className="chat__head_left">
                            <a href="#">
                                <div className="md__user_pic">
                                    <img src="../img/content/user.jpg"
                                         alt=""
                                         className="md__user_image"
                                    />
                                </div>
                                <span
                                    className="md__user_name">
                                    
                                    Eugene Alitz
                                </span>
                            </a>
                        </div>
                    </div>
                    
                    <ChatContent data={this.state.messages}/>
                    <ChatSubmit/>
                
                </div>
            </div>
        
        )
    }
});

const App = React.createClass({
    
    render : function () {
        return (
            <div className="wrapper">
                <ChatBlock/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);