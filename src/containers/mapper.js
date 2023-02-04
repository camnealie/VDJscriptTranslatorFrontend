import { Button, Grid, TextField } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

// Import Swiper React components

@inject('store')
@observer
export default class Mapper extends Component {
  state = {
    loading: true,
    loadedJson: {},
  };

  componentDidMount = () => this.fetchJson();

  fetchJson = () => {
    this.props.store.fetchJson().then((e) => {
      console.log('got it back', e);
      this.setState({ loadedJson: e, loading: false });
    });
  };

  setChange = (initialObject, newAction) => {
    console.log('setChange fire', initialObject.value, newAction);

    let loadedJson = this.state.loadedJson;

    let indexWeWant = loadedJson.mapper.map.findIndex(
      (e) => e['$'].value == initialObject.value
    );

    loadedJson.mapper.map[indexWeWant]['$'].action = newAction;

    this.setState({ loadedJson: loadedJson });

    this.props.store.postJSON(this.state.loadedJson);
  };

  render() {
    const { loadedJson, loading } = this.state;
    if (loading) return <div>loading</div>;

    return (
      <div>
        {loadedJson.mapper.map.map((e) => (
          <ActionEdit
            i={e['$']}
            key={e['$'].value}
            setChange={this.setChange}
          />
        ))}
        <pre>{JSON.stringify(loadedJson, null, 2)}</pre>;
      </div>
    );
  }
}

@inject('store')
@observer
class ActionEdit extends Component {
  state = { newVal: this.props.i.action };

  onChange = (e) => {
    this.setState({ newVal: e.target.value });
  };

  submitChange = () => this.props.setChange(this.props.i, this.state.newVal);

  render() {
    const { i } = this.props;
    return (
      <div style={{ width: '1000px' }}>
        <Grid container>
          <Grid item xs={8}>
            <TextField
              label={i.value}
              value={this.state.newVal}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              style={{ marginTop: '25px' }}
              variant="contained"
              onClick={this.submitChange}
              children={'Confim'}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
