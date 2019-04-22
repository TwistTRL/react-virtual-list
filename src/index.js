import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import VirtualList from "./lib";

class App extends Component {
  render(){
    return (
      <VirtualList width={200} height={200} rowHeight={40} scrollbarColor="green">
        <p key='p1'>a p</p>
        <p key='p2'>a p</p>
        <div key='div1'>a div</div>
        <span key='span1'>a span</span>
        <p key='p3'>a p</p>
        <span key='span2'>a span</span>
        <div key='div2'>a div</div>
        <div key='div3'>a div</div>
        <p key='p4'>a p</p>
        <div key='div4'>a div</div>
        <span key='span3'>a span</span>
        <span key='span4'>a span</span>
      </VirtualList>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
