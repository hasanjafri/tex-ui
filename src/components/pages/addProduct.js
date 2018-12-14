import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class addProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            description: "",
            datetime: "",
            longitude: "",
            latitude: "",
            elevation: "",
            response: ""
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    generateBodyDict = () => {
        console.log(this.state.datetime);
        return {
            "p_id": this.state.id,
            "p_description": this.state.description,
            "p_datetime": this.state.datetime,
            "longitude": this.state.longitude,
            "latitude": this.state.latitude,
            "elevation": this.state.elevation
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/tex/', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.generateBodyDict())
        })
        .then(response => response.json()).then(json => {
            this.setState({
                response: json
            })
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="display1" gutterBottom>
                    Add New Product
                    <Divider/>
                    <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <TextField value={this.state.id} onChange={this.handleChange('id')} type="number" className={classNames(classes.textField, classes.dense)} margin="dense" label="id"/>
                            <TextField value={this.state.description} onChange={this.handleChange('description')} multiline rowsMax="4" className={classNames(classes.textField, classes.dense)} margin="dense" label="description"/>
                            <TextField value={this.state.datetime} onChange={this.handleChange('datetime')} type="datetime-local" className={classes.textField} margin="normal" label="datetime" InputLabelProps={{shrink: true}}/>
                            <TextField value={this.state.longitude} onChange={this.handleChange('longitude')} type="number" multiline rowsMax="2" className={classNames(classes.textField, classes.dense)} margin="dense" label="longitude"/>
                            <TextField value={this.state.latitude} onChange={this.handleChange('latitude')} type="number" multiline rowsMax="2" className={classNames(classes.textField, classes.dense)} margin="dense" label="latitude"/>
                            <TextField value={this.state.elevation} onChange={this.handleChange('elevation')} type="number" multiline rowsMax="2" className={classNames(classes.textField, classes.dense)} margin="dense" label="elevation"/>
                            <Button variant="contained" color="primary" className={classes.button} type="submit">
                                Add Product
                                <SendIcon className={classes.rightIcon}/>
                            </Button>
                        </FormControl>
                    </form>
                </Typography>
                <div>{this.state.response}</div>
            </main>
        );
    }
}

export default (withStyles)(styles)(addProduct);