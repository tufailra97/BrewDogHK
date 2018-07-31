import React, { Component } from 'react';

class Home extends Component {

  state = {
    data : null,
    modalData : null,
    modalStatus : false
  }

  componentWillMount(){
    this.getData();
  }

  getData = () => {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=80&brewed_after=12-2014&abv_gt=5&abv_lt=11')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        data : data
      });
    }).catch(err => console.log('error', err));
  }

  getIngredient = (i) => {
    const { hops, malt } = i;
    let showIngredients;

    
    if(hops.length > 1){
      showIngredients = hops.map((e, index) => {
        return (
          <tr key = {index}>
            <td>{e.name}</td>
            <td>{e.amount.value}</td>
            <td>{e.attribute}</td>
          </tr>
        )
      });
    };

    if(malt.length > 1) {
      if(showIngredients.length > 1){
        showIngredients.push(malt.map((e, index) => {
          return (
            <tr key = {index + 10}>
              <td>{e.name}</td>
              <td>{e.amount.value}</td>
              <td>{e.attribute}</td>
            </tr>
          )
        }));
      }else {
        showIngredients = hops.map((e, index) => {
          return (
            <tr key = {index}>
              <td>{e.name}</td>
              <td>{e.amount.value}</td>
              <td>{e.attribute}</td>
            </tr>
          )
        });
      }
    }
    
    return showIngredients;
  }

  render() {
    const {data} = this.state;
    const {modalData} = this.state;
    let showInfo;
    let results;

    if(data === null){
      results =(
        <div className = 'loader-container'>
          <div className = 'loader' />
        </div>
      ) 
    }else{
      results = data.map((e) => {
        return (
          <div key = {e.name} className = 'item' onClick = {()=> {
            this.setState({
              modalData : e,
              modalStatus : true
            });
          }}>
            <img src = {e.image_url} alt = {e.name}/>
            <h2>{e.name}</h2>
          </div>
        )
      })
    }

    if(modalData !== null){
      console.log('modal in render ', modalData);
      showInfo = (
        <div className = 'modal-body'>
          <div className = 'modal-media'>
            <img src = {modalData.image_url} alt = {modalData.name}/>
          </div>
          <div className = 'modal-desc'>
            <div className = 'first'>
              <h1>{modalData.name}</h1>
              <h2>{modalData.tagline}</h2>
            </div>

            <div className = 'desc'>
              <h2>Description</h2>
              <p>{modalData.description}</p>
            </div>
            <div className = 'desc'>
              <h2>Ingredients</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getIngredient(modalData.ingredients)}
                </tbody>
              </table>
            </div>
            
            <div className = 'desc'>
              <h2>Brewers Tips</h2>
              <p>{modalData.brewers_tips}</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <section id = 'results'>
          <div className = 'wrapper'>
            <h1>Our Products</h1>
            <div className = 'search-results'>
              { results }
            </div>
          </div>
        </section>
        <section id = 'modal' className = {this.state.modalStatus === true ? 'modal-open' : 'modal-close'}>
          <div className = 'close-button'>
            <button 
              onClick = {()=> {this.setState({modalStatus : false})}}
            >
              <span>X</span>
            </button>
          </div>
          {showInfo}
        </section>
      </div>
    );
  }
}

export default Home;