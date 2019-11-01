/* global chrome */
import React, {Component} from 'react';
import {breakStatement} from "@babel/types";

/* ****************
    Board ID
      dev test: MRxTdQzd
      build: EGv1MKmw
*/


class SettingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_Save: false,
      api_key: '',
      token_key: '',
      board_id: 'EGv1MKmw',
      board_list: [],
      list_name: 'Choose a list',
      list_id: ''
    };
  }

  componentWillMount() {
    let api_key = localStorage.getItem('api_key');
    let token_key = localStorage.getItem('token_key');
    let list_id = localStorage.getItem('list_id');
    let list_name = localStorage.getItem('list_name');

    if (api_key && token_key && list_id) {
      this.setState({
        api_key: api_key,
        token_key: token_key,
        list_id: list_id,
        list_name: list_name,
        is_Save: true
      })
    }
  }

  isChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
    if (event.nativeEvent.target.selectedIndex) {
      let list_name = event.nativeEvent.target.selectedIndex;
      this.setState({
        list_name: event.target.options[list_name].text
      });
    }
  };

  handleSave = (event, state) => {
    event.preventDefault();
    if(!this.state.list_id) {
      this.setState({
        error: "  * Please check this field!"
      });
    } else {
      this.setState({
        error: false,
        is_Save: true
      });
      chrome.extension.sendMessage({state});
    }
  };

  handleEdit = (event) => {
    event.preventDefault();
    this.setBoardList();
    this.setState({
      is_Save: false

    })
  };

  handleClear = () => {
    localStorage.clear();
    this.setState({
      is_Save: false,
      api_key: '',
      token_key: '',
      board_list: [],
      list_name: 'Choose a list',
      list_id: ''
    })
  };

  setBoardList = () => {
    const {api_key, token_key, board_id} = this.state;

    if (api_key && token_key && board_id) {
      fetch('https://api.trello.com/1/boards/' + board_id
          + '/lists?key=' + api_key
          + '&token=' + token_key
      )
          .then(res => res.json())
          .then(data => {
            this.setState({
              board_list: data
            });
          });
    }
  };

  render() {
    let list = this.state.board_list && this.state.board_list.map(list => {
      return <option key={list.id} value={list.id}>{list.name}</option>
    });
    return (
        <div className="setting-form mt-4">
          <form method="POST" onSubmit={(e) => this.handleSave(e, this.state)}>
            <div className="form-group">
              <label htmlFor="api-key">API key:</label>
              {!this.state.is_Save ?
                  <input type="text" className="form-control form-control-sm" name="api_key" id="api-key"
                         onChange={(e) => this.isChange(e)} value={this.state.api_key} required
                         onBlur={() => this.setBoardList()}/>
                  :
                  <p><kbd>{this.state.api_key}</kbd></p>
              }
            </div>
            <div className="form-group">
              <label htmlFor="token-key">Token:</label>
              {!this.state.is_Save ?
                  <input type='text' className='form-control form-control-sm' name='token_key' id='token-key'
                         onChange={(e) => this.isChange(e)} value={this.state.token_key} required
                         onBlur={() => this.setBoardList()}/>
                  :
                  <p><kbd>{this.state.token_key}</kbd></p>
              }
            </div>
            <div className="form-group">
              <label htmlFor="list_id">List:</label> <span className='text-danger font-italic font-size-10'>{this.state.error}</span>
              {!this.state.is_Save ?
                  <select className="form-control" name="list_id" id="list_id" onChange={(e) => this.isChange(e)}
                          defaultValue={this.state.list_name} onBlur={(e) => this.isChange(e)}>
                    <option disabled>Choose a list</option>
                    {list}
                  </select>
                  :
                  <p><kbd>{this.state.list_name}</kbd></p>
              }
            </div>
            {this.state.is_Save ?
                <div className="btn-group mt-3" role="group">
                  <button className="btn btn-warning btn-sm" onClick={(e) => this.handleEdit(e)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleClear()}>
                    Reset
                  </button>
                </div>
                :
                <div>
                  <button type="submit" className="btn btn-primary btn-sm mt-3 mb-3">Save</button>
                  <p><a href="https://trello.com/app-key" target="_blank" rel="noopener noreferrer">Get API key & token
                    here</a></p>
                  <div className="magic-block-callout type-warning">
                    <h6>Be sure to log in to Trello!</h6>
                    <div className="callout-body">
                      <p>You must be logged into Trello to retrieve your API key. If you see
                        the message "Not logged in" when visiting the link above you need to login via
                        <a href="https://trello.com/login" target="_blank"
                           rel="noopener noreferrer"> https://trello.com/login</a>.
                      </p>
                    </div>
                  </div>
                </div>
            }
          </form>
        </div>
    );
  }
}

export default SettingForm;