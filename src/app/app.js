var React = require('react');

var $ = require('jquery');

class UserRow extends React.Component {
  render() {
    var baseURL = 'https://www.freecodecamp.com/';
    return (
      <tr className='camper'>
        <td>{this.props.userNum}</td>
        <td className='camper-name'><a href={baseURL + this.props.userName} target='_blank' className='camper-name-link'><img src={this.props.image} className='camper-name-image'/>{this.props.userName}</a></td>
        <td className='camper-points'>{this.props.pointsRecent}</td>
        <td className='camper-points'>{this.props.pointsAll}</td>
        </tr>
    );
  }
}

class TableContents extends React.Component {
  render() {
    var dataArr = this.props.data;
    var users = '';
    if (dataArr.length > 0) {
      users = dataArr.map((userObj, userID) =>
        (<UserRow userNum={userID + 1} image={userObj.img} userName={userObj.username} pointsRecent={userObj.recent} pointsAll={userObj.alltime} />));
      if (this.props.sortBy == 'all') {
        users.sort(function(a, b) {
          return b.props.pointsAll - a.props.pointsAll;
        });
      }
    }
    return (
      <tbody>{users}</tbody>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: 'recent'
    };
  }
  loadData() {
    $.get(this.props.source, function(result) {
      this.setState({
        data: result
      });
    }.bind(this));
  }
  componentWillMount() {
    this.loadData();
  }
  handleClick(sortBy, event) {
    this.setState({
      sort: sortBy
    });

  }
  render() {
    var recentClass = 'sort-button';
    var allClass = 'sort-button';
    if (this.state.sort == 'recent') {
      recentClass = 'sort-button sorted';
    } else {
      allClass = 'sort-button sorted';
    }
    return (
      <table className='leaderboard'>
        <caption className='title'>
          Leaderboard
        </caption>
        <thead>
        <tr>
        <th className='table-head'>#</th>
        <th className='table-head'>Camper Name</th>
          <th><button onClick={this.handleClick.bind(this, 'recent')} className={recentClass}>Points in past 30 days</button></th>
          <th><button onClick={this.handleClick.bind(this, 'all')} className={allClass}>All time points</button></th>
          </tr>
        </thead>
        <TableContents data={this.state.data} sortBy={this.state.sort} />
        </table>
    );
  }
}

export default Table;