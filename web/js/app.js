window.ee = new EventEmitter();

let my__messages = [
    {
        msgId : '001',
        user : {
            userId : '001',
            name : "Eugene Alitz"
        },
        msgText : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate dolore enim error fugiat minus sed! Ad, eveniet, facere facilis illo nobis nostrum, provident quisquam similique sit unde veritatis voluptate.",
        msgDate : "22/10/2016"
    },
    {
        msgId : '002',
        user : {
            userId : '002',
            name : "Amad Sergin"
        },
        msgText : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate dolore enim error fugiat minus sed! Ad, eveniet, facere facilis illo nobis nostrum, provident quisquam similique sit unde veritatis voluptate.",
        msgDate : "23/10/2016"
    },
    {
        msgId : '003',
        user : {
            userId : '001',
            name : "Eugene Alitz"
        },
        msgText : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate dolore enim error fugiat minus sed! Ad, eveniet, facere facilis illo nobis nostrum, provident quisquam similique sit unde veritatis voluptate.",
        msgDate : "23/10/2016"
    },
    {
        msgId : '004',
        user : {
            userId : '002',
            name : "Amad Sergin"
        },
        msgText : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate dolore enim error fugiat minus sed! Ad, eveniet, facere facilis illo nobis nostrum, provident quisquam similique sit unde veritatis voluptate.",
        msgDate : "25/10/2016"
    }
];

const Message = React.createClass({
    propTypes : {
        data : React.PropTypes.shape({
            userId : React.PropTypes.string.isRequired,
            userPic : React.PropTypes.string.isRequired,
            msgText : React.PropTypes.string.isRequired,
            msgDate : React.PropTypes.string.isRequired
        })
    },
    
    render : function () {
        let userId = this.props.data.userId,
            userPic = this.props.data.userPic,
            msgText = this.props.data.msgText,
            msgDate = this.props.data.msgDate;
        
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
                        <span className="chat__message_time">
                            {msgDate}
                        </span>
                    </li>
                </ul>
            </div>
        
        )
    }
});

const ChatContent = React.createClass({
    render : function () {
        return (
            <div
                className="chat__wrapper chat__box_wrapper chat__box_active"
                id="chat">
                <div className="chat__content">
                
                </div>
            
            </div>
        
        )
    }
});


const ChatBlock = React.createClass({
    
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
                    
                    <ChatContent/>
                
                </div>
            </div>
        
        )
    }
});


const App = React.createClass({
    getInitialState : function () {
        return {
            messages : my__messages
        };
    },
    
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