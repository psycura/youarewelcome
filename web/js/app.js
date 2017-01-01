window.ee = new EventEmitter();

let ChatBlock = React.createClass({
    getInitialState : function () {
        return {
            btnVisible : true
        }
    },
    
    render : function () {
        let visible = this.state.btnVisible;
        return (
            <div>
                <div className={"open-chat__btn " + (visible ? "" : "none")}
                     id="open__chat_btn">
                    <a href="#" id="openChat" className="btn btn-success btn-lg">
                        <i className="fa fa-whatsapp"/>
                        <span>Давай поговорим</span>
                    </a>
                </div>
                <div id="chat__block"
                     className={"chat__block " + (visible ? "none" : "")}>
                
                </div>
            </div>
        
        )
    }
});


let App = React.createClass({
    
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