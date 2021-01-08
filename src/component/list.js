import React from 'react'
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import "./list.css";

const listUrl = 'https://detangled.in/develop/d8106843-c45c-4003-8d02-b9c3dcf458ab/events'
const removeUrl = 'https://detangled.in/develop/d8106843-c45c-4003-8d02-b9c3dcf458ab/events/'

class List extends React.Component {

  state = {
    eventData:[],
    SelectDate:new Date(),
    editDestnationStatus: {status:false, key:null},
    destination:'',
    editCommentStatus:{status:false, key:null},
    comment:''
  }
   async componentDidMount () {
    let response = await fetch(listUrl)
    if (response.ok) {
    let data =  await response.json()
    if (data.length && data.length > 0) {
      this.setState({eventData:data})
    }
  } else {
    console.warn("HTTP-Error: " + response.status);
  }
}

handleDateChange = date => {
  console.log('date', date, moment(date).format("DD/MM/YYYY"))
  let formattedDate = moment(date).format("DD/MM/YYYY")
    this.setState({ SelectDate: formattedDate })
}
 deleteItem = (index) => {
  this.state.eventData.splice(index, 1)
  this.setState({ eventData:this.state.eventData })
}

handleCalender = (e) => {
  this.setState({ date: e.target.value })
}

handleDelete = async (id) => {
  console.log('delete id', id)
  const newList = this.state.eventData.filter((item) => item.id !== id);
  this.setState({ eventData: newList })
}

onEdit = (e, id) => {
    this.state.editDestnationStatus.status = true
    this.state.editDestnationStatus.key = id
    this.setState({editDestnationStatus:this.state.editDestnationStatus})
}

onEditComment = (e, id) => {
    this.state.editCommentStatus.status = true
    this.state.editCommentStatus.key = id
    this.setState({editCommentStatus:this.state.editCommentStatus})
}

handleDestination = (e) => {
    this.setState({ destination: e.target.value })
}

handleComment = (e) => {
    let commentValue = e.target.value
    this.setState({ comment: commentValue })
}

handleDestinationCancel = (e, id) => {
    this.state.editDestnationStatus.status = false
    this.state.editDestnationStatus.key = id
    this.setState({editDestnationStatus:this.state.editDestnationStatus})
}

handleCommentCancel = (e, id) => {
    this.state.editCommentStatus.status = false
    this.state.editCommentStatus.key = id
    this.setState({editCommentStatus:this.state.editCommentStatus})
}

handleCommentSave = () => {
    //API CALL
}

handleDestinationSave = () => {
    //API CALL
}

  render() {
    const { eventData } = this.state
    console.log('eventData', eventData)
    return (
      <div>
        <h1>I am List</h1>
          <div className='container'>
        {eventData.map((i, index) => (
        <div className='box'>
      <button  className='trash'  onClick={() => this.handleDelete(i.id)}><i className="fas fa-trash"></i></button>
      { this.state.editDestnationStatus.status && this.state.editDestnationStatus.key === i.id ? (
        <React.Fragment>
        <input value={this.state.destination} onChange={this.handleDestination}/>
        <button onClick={(e) => this.handleDestinationSave(e, i.id)}>Save</button>
        <button onClick={(e) => this.handleDestinationCancel(e, i.id)}>Cancel</button>
        </React.Fragment>
   ) : (
         <label>destination - {i.destination} 
         <button  className='edit' onClick={(e) => this.onEdit(e,i.id)}>
           <i className="fas fa-edit"></i>
           </button>
         </label>
   )}
    <p>duration -  {i.start}</p>
    <DatePicker
      selected={moment(i.start).toDate()}
      onChange={(date) => this.handleDateChange(date)}
      onFocus={e => e.target.blur()}
    />
    <p>duration - {i.duration}</p>
    {
    this.state.editCommentStatus.status && this.state.editCommentStatus.key === i.id ? (
    <React.Fragment>
      <input value={this.state.comment} onChange={this.handleComment}/>
      <button onClick={(e) => this.handleCommentSave(e, i.id)}>Save</button>
      <button onClick={(e) => this.handleCommentCancel(e, i.id)}>Cancel</button>
      </React.Fragment>
  ) : (
    <p>comment  - {i.comment} <button onClick={(e) => this.onEditComment(e, i.id)}>
    <i className="fas fa-edit edit"></i></button></p>
  )} 
  </div>
))}
      </div>
      </div>
    )
  }
}

export default List