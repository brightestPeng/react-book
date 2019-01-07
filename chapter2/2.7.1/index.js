import React from "react";
import ReactDOM from "react-dom";

//父组件  向子组件传递属性
const Child = ({ name })=>{
    return(
        <div>{name}</div>
    )
}

class Father extends React.Component{

    constructor(){
        super();
        this.state = {
            name:"Peng"
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                name:"React"
            })
        },2000)
    }

    render(){
        return(
            <Child name={this.state.name}  />
        )
    }
}

//子组件向父组件传递消息
// method one(通过 callback 方式)
class Child1 extends React.Component{

    constructor(props){
        super(props);

        setTimeout(()=>{
            this.props.sayHello("Hello Fater1,I'm Child1!!!");
        },2000)
    }

    render(){
        return(
            <div>Child1</div>
        )
    }
}

class Father1 extends React.Component{

    constructor(){
        super();
        this.state = {
            say:"Father1"
        }
    }

    sayHello(say){
        this.setState({
            say
        })
    }

    render(){
        return(
            <div>{this.state.say}
                <Child1 sayHello={this.sayHello.bind(this)} />
            </div>
        )
    }
}

//method two (通过发布与订阅的事件基类)
class EventEmitter{
    constructor(){
        this.eventMap = {}
    }

    sub(name,cb){
        const eventList = this.eventMap[name] = this.eventMap[name] || {};
        eventList.push(cb);
    }

    pub(name,...data){
        (this.eventMap[name] || []).forEach(cb=>cb(...data))
    }
}

class Child2 extends EventEmitter{
    constructor(){
        super();
        //通过消息接口发布消息
        setTimeout(()=>{
            this.pub("update")
        },2000)
    }
}

class Father2 extends React.Component{
    constructor(){
        super();
        this.state = { name:"Father2" };
        this.child = new Child2();
        this.child.sub("update",()=>{
            this.setState({ name:"Child Update" })
        })
    }

    render(){
        return(
            <div>{this.state.name}</div>
        )
    }
}





class App extends React.Component{

    render(){
        return(
            <div>
                <hr />
                Hello,<Father />
                <hr />
                <Father1 />
                <hr />
                <Father2 />
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById("app"));