import React, { Component } from 'react'
// import { FAB } from 'react-material-design'
// import { Modal } from 'react-bootstrap';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from 'react-mdl';
import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataFilter: [],
      dataList: [],
      dataSelected: []
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  /* addDataList(e) {
    var array = [...this.state.dataFilter]; // make a separate copy of the array
    var index = array.indexOf(e.target.value)
    array.push(index);
    this.setState({dataList: array});
  } */

  removeDataList(e) {console.log(e, ':e')
    var array = [...this.state.dataList]; // make a separate copy of the array
    var index = array.indexOf(e.target.value)
    array.splice(index, 1);
    this.setState({dataList: array});
  }

  removeDataFilter(e) {console.log(e, ':e')
    var array = [...this.state.dataFilter]; // make a separate copy of the array
    var index = array.indexOf(e)
    array.splice(index, 1);
    this.setState({dataFilter: array});
  }

  handleChange(e) {
    console.log(e.target.value, ';e.target.value');
    const filter = e.target.value;

    const newState = this.state;

    const index = newState.data
      .map((d, index) => {
        return d.filter((dt, k) => {
          if(dt.name.toLowerCase().indexOf(filter) > -1) {
            // if(newState.dataSelected.find(a => a == dt.id)) {
              // console.log(dt.id, 'a');
              return dt;
            // }else{
              // console.log(dt.id, 'b');
            // }
          }
        });
    })
    console.log(index, ':index');

    this.setState({
      dataFilter: index
    });
  }

  handleClickAdd(d) {
    // console.log(e.target.value, ':e.target.value');
    // console.log(e, ':e');
    console.log(d.id, ':d.id');
    this.state.dataList.push([d])
    // this.removeDataFilter(d.id);
    // this.state.dataSelected.push([d.id])
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  /* getDataFilter(n) {
    const limit = 20;
    fetch("http://localhost:3030/api/cards?limit="+limit+"&name="+n).
      then(response => response.json()).
      then(findresponse => {
        this.setState({
          data: [findresponse.cards],
          dataFilter: [findresponse.cards]
        });
        console.log(this.state.data);
      })
  } */

  componentDidMount() {
    fetch("http://localhost:3030/api/cards?limit=20").
      then(response => response.json()).
      then(findresponse => {
        this.setState({
          data: [findresponse.cards],
          dataFilter: [findresponse.cards]
        });
        console.log(this.state.data);
      })
  }

  render() {

    return (
      <div className="App" class="main-box row">
        <div>
          <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
            <DialogTitle>
            <div class="search">
              <span class="fa fa-search"></span>
              <input placeholder="Find Pokemon" onChange={this.handleChange.bind(this)} />
            </div>
            </DialogTitle>
            <DialogContent>
            <div class="content-dialog">
              {
                this.state.dataFilter.map((dynamicData, Key) => {
                  let keys = Object.keys(dynamicData);
                  let d = dynamicData;
                  return keys.map(data => {
                    const hp = (dynamicData[data].hp > 100) ? 100 : 
                      ((dynamicData[data].hp !== undefined) ? dynamicData[data].hp : 0);
                    const progressHP = {
                      width: hp + '%',
                    };
                    return (
                      <div class="cardBackground-dialog">
                        <div class="add">
                          <a onClick={this.handleClickAdd.bind(this, dynamicData[data])}>Add</a>
                        </div>
                        <div class="display-pic"><img src={dynamicData[data].imageUrl} /></div>
                        <div class="display-data">
                          <div class="display-detail">
                            <div class="display-name"><h3>{dynamicData[data].name}</h3></div>
                            <div class="display-progress"> 
                              <label>HP</label>
                              <div class="meter">
                                <span style={progressHP}></span>
                              </div>
                            </div>
                            <div style={{clear:'both'}}></div>
                            <div class="display-progress"> 
                              <label>STR</label>
                              <div class="meter">
                                <span style={progressHP}></span>
                              </div>
                            </div>
                            <div style={{clear:'both'}}></div>
                            <div class="display-progress"> 
                              <label>WEAK</label>
                              <div class="meter">
                                <span style={progressHP}></span>
                              </div>
                            </div>
                            <div style={{clear:'both'}}></div>
                            <div class="display-progress"> 
                              <i class="material-icons">
                                sentiment_satisfied_alt
                              </i>
                              <i class="material-icons">
                                sentiment_satisfied_alt
                              </i>
                              <i class="material-icons">
                                sentiment_satisfied_alt
                              </i>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                }) 
              }
            </div>
            </DialogContent>
            <DialogActions>
              <Button type='button' onClick={this.handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <div class="addBox">
            <div class="btn_add circle" onClick={this.handleOpenDialog}>+</div>
          </div>
          {
            this.state.dataList.map((dynamicData, Key) => {
              let keys = Object.keys(dynamicData);
              let d = dynamicData;
              return keys.map(data => {
                const hp = (dynamicData[data].hp > 100) ? 100 : 
                  ((dynamicData[data].hp !== undefined) ? dynamicData[data].hp : 0);
                const progressHP = {
                  width: hp + '%',
                };
                return (
                  <div class="cardBackground column">
                    <div class="remove">
                      <a onClick={this.removeDataList.bind(this)}>X</a>
                    </div>
                    <div class="display-pic"><img src={dynamicData[data].imageUrl} /></div>
                    <div class="display-data">
                      <div class="display-detail">
                        <div class="display-name"><h3>{dynamicData[data].name} ( {data} )</h3></div>
                        <div class="display-progress"> 
                          <label>HP</label>
                          <div class="meter">
                            <span style={progressHP}></span>
                          </div>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div class="display-progress"> 
                          <label>STR</label>
                          <div class="meter">
                            <span style={progressHP}></span>
                          </div>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div class="display-progress"> 
                          <label>WEAK</label>
                          <div class="meter">
                            <span style={progressHP}></span>
                          </div>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div class="display-progress"> 
                          <i class="material-icons">
                            sentiment_satisfied_alt
                          </i>
                          <i class="material-icons">
                            sentiment_satisfied_alt
                          </i>
                          <i class="material-icons">
                            sentiment_satisfied_alt
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            }) 
          }
        </div>
      </div>
    )
  }
}

export default App
