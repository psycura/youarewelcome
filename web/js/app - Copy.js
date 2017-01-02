window.ee = new EventEmitter();



let my_news = [
    {
        author : 'Саша Печкин',
        text : 'В четчерг, четвертого числа...',
        bigText : 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author : 'Просто Вася',
        text : 'Считаю, что $ должен стоить 35 рублей!',
        bigText : 'А евро 42!'
    },
    {
        author : 'Гость',
        text : 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText : 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

let Article = React.createClass({
    propTypes : {
        data : React.PropTypes.shape({
            author : React.PropTypes.string.isRequired,
            text : React.PropTypes.string.isRequired,
            bigText : React.PropTypes.string.isRequired
        })
    },
    
    getInitialState : function () {
        return {
            visible : false
        };
    },
    
    readMoreClick : function (e) {
        e.preventDefault();
        this.setState({visible : true})//можно добавить еще один аргумент callback
    },
    
    render : function () {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;
        
        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#"
                   onClick={this.readMoreClick}
                   className={"news__readmore " + (visible ? "none" : "")}>
                    Read More
                </a>
                <p className={"news__big-text " + (visible ? "" : "none")}>
                    {bigText}
                </p>
            </div>
        )
    }
});

let News = React.createClass({
    propTypes : {
        data : React.PropTypes.array.isRequired
    },
    
    getInitialState : function () {
        return {
            counter : 0
        };
    },
    
    render : function () {
        let data = this.props.data;
        let newsTemplate;
        
        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }
        
        
        return (
            <div className="news">
                {newsTemplate}
                <strong
                    className={data.length > 0 ? "" : "none"}>
                    Всего новостей: {data.length}
                </strong>
            
            </div>
        );
    }
});

let Add = React.createClass({
    componentDidMount : function () {
        ReactDOM.findDOMNode(this.refs.authorInput).focus();//set focus
        
    },
    onClickHandler : function () {
        let author = ReactDOM.findDOMNode(this.refs.authorInput).value,
            textEl = ReactDOM.findDOMNode(this.refs.newsText),
            text = textEl.value;
        
        let item = [{
            author : author,
            text : text,
            bigText : '...'
        }];
        window.ee.emit('News.add', item);
        textEl.value = '';
        
        
    },
    render : function () {
        return (
            <form className="add cf">
                <input
                    type="text"
                    className="author test"
                    defaultValue=''
                    placeholder="Author"
                    ref='authorInput'
                
                />
                <textarea
                    name="news"
                    defaultValue=''
                    placeholder="enter teh news text"
                    ref='newsText'
                    className=" test"
                />
                
                <label className="test">
                    <input type="checkbox"
                           name="checkbox"
                           ref='checkbox'
                    
                    />
                    I agree with this
                </label>
                
                <input
                    type="submit"
                    className="test-button test"
                    onClick={this.onClickHandler}
                    ref="alert_button">
                </input>
            </form>
        )
    }
});

let App = React.createClass({
    getInitialState : function () {
        return {
            news : my_news
        };
    },
    
    componentDidMount : function () {
        /* Слушай событие "Создана новость"
         если событие произошло, обнови this.state.news
         */
        let self = this;
        window.ee.addListener('News.add', function (item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news : nextNews});
        })
    },
    
    componentWillUnmount : function () {
        /* Больше не слушай событие "Создана новость" */
        window.ee.removeListener('News.add');
        
    },
    
    render : function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add/>
                <News data={this.state.news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);