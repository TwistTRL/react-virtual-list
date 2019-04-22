import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types';
import VerticalScrollbar from "react-vertical-scrollbar";

// CSS
import "./VirtualList.css";

const SCROLLBAR_WIDTH = 10;
const ROW_COLOR_CYCLE = ["white","#f0f0f0"];

class VirtualList extends Component {
  constructor(props) {
    super(props);
    this.state = {scrollStart:0};
    this.renderedItems = new Set();
  }
  
  static getDerivedStateFromProps(props,state) {
    let {children, height, rowHeight} = props;
    let {scrollStart} = state;
    if (scrollStart>React.Children.count(children)*rowHeight-height) {
      return {scrollStart:Math.max(0,React.Children.count(children)*rowHeight-height)};
    }
    return null;
  }
  
  render(){
    let {width,height,rowHeight,scrollbarColor,children} = this.props;
    let {scrollStart} = this.state;
    let {renderedItems} = this;
    let totalHeight = rowHeight*React.Children.count(children);
    // Add scrollbar if needed
    let ScrollbarElem = null;
    let listWidth = width;
    if (height<totalHeight) {
      ScrollbarElem = <VerticalScrollbar  width={SCROLLBAR_WIDTH} height={height} color={scrollbarColor}
                                          realHeight={totalHeight} realRange={height} scrollStart={scrollStart}
                                          updateScrollStartHandler={this.handleScrollStartUpdate}
                                          />
      listWidth -= SCROLLBAR_WIDTH;
    }
    // Add list items
    let existingChildKey = new Set(React.Children.map(children,
      (child)=>
        child.key
      ));
    for (let childKey of renderedItems) {
      if (!existingChildKey.has(childKey))
        renderedItems.delete(childKey);
    }
    let items = React.Children.map(children,
      (child,i)=>{
        if (!this.renderedItems.has(child.key) && (
            i*rowHeight+rowHeight<=scrollStart ||
            i*rowHeight>=scrollStart+height )
            ){
          return null;
        }
        else {
          renderedItems.add(child.key);
          return ( 
            <div  key={child.key}
                  className="VirtualList-rowContainer"
                  style={{height:rowHeight,top:i*rowHeight,backgroundColor:ROW_COLOR_CYCLE[i%ROW_COLOR_CYCLE.length]}}
                  >
              {child}
            </div>
          );
        }
      });
    
    return (
      <Fragment>
        <div  className="VirtualList-masterContainer"
              style={{width:width,height:height}}
              onWheel={this.handleScroll}
              >
          {ScrollbarElem}
          <div  className="VirtualList-mainContainer"
                style={{height:height,width:listWidth,top:-scrollStart}}>
            {items}
          </div>
        </div>
      </Fragment>
    )
  }
  
  capScrollStart(scrollStart) {
    let {height,children,rowHeight} = this.props;
    let realHeight = rowHeight*React.Children.count(children);
    if (realHeight<height){
      return 0;
    }
    else {
      return Math.max(0,Math.min(realHeight-height,scrollStart));
    }
  }
  
  handleScrollStartUpdate = (scrollStart)=>{
    scrollStart = this.capScrollStart(scrollStart);
    this.setState({scrollStart});
  }
  
  handleScroll=(ev)=>{
    ev.preventDefault();
    ev.stopPropagation();
    let {scrollStart} = this.state;
    if (ev.deltaY<0) {
      this.handleScrollStartUpdate(scrollStart-10);
    }
    else {
      this.handleScrollStartUpdate(scrollStart+10);
    }
  }
}

VirtualList.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  children: PropTypes.node,
}

export default VirtualList;

