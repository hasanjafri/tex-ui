import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import WarningIcon from '@material-ui/icons/Warning';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, InputLabel, Select, MenuItem } from '@material-ui/core';

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
  leftIcon: {
    marginRight: theme.spacing.unit
  },
})

class editProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dbId: "",
            id: "",
            description: "",
            datetime: "",
            longitude: "",
            latitude: "",
            elevation: "",
            response: "",
            productData: this.fetchProducts()
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleDbIdChange = (event) => {
        let selectedProduct = this.state.productData.find(obj => obj.id === event.target.value)
        if (selectedProduct !== undefined) {
            this.setState({
                dbId: selectedProduct.id,
                id: selectedProduct.p_id,
                description: selectedProduct.p_description,
                datetime: selectedProduct.p_datetime,
                longitude: selectedProduct.longitude,
                latitude: selectedProduct.latitude,
                elevation: selectedProduct.elevation
            })
        }        
    }

    fetchProducts = () => {
        fetch('http://127.0.0.1:8000/tex/').then(response => response.json()).then(json => {
          this.setState({
            productData: json
          })
        })
    }

    generateBodyDict = () => {
        return {
            "id": this.state.dbId,
            "p_id": this.state.id,
            "p_description": this.state.description,
            "p_datetime": this.state.datetime,
            "longitude": this.state.longitude,
            "latitude": this.state.latitude,
            "elevation": this.state.elevation
        }
    }

    handleDelete = () => {
        if (this.state.dbId === "") {
            this.setState({
                response: "Error: You must select a referenced database object from the dropdown above to delete"
            })
        } else {
            fetch('http://127.0.0.1:8000/tex/'+this.state.dbId, {
                method: "DELETE",
                mode: "cors",
            })
            .then(response => response.json()).then(json => {
                if (!json.Error) {
                    this.setState({
                        response: json.resp,
                        productData: this.fetchProducts()
                    })
                } else {
                    this.setState({
                        response: json.Error
                    })
                }
            })
            this.resetSelectedProduct();
        }
    }

    handleUpdate = (event) => {
        event.preventDefault();
        if (this.state.dbId === "") {
            this.setState({
                response: "Error: You must select a referenced database object from the dropdown above to update"
            })
        } else {
            fetch('http://127.0.0.1:8000/tex/'+this.state.dbId, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.generateBodyDict())
            })
            .then(response => response.json()).then(json => {
                if (!json.Error) {
                    this.setState({
                        response: json.resp,
                        productData: this.fetchProducts()
                    })
                } else {
                    this.setState({
                        response: json.Error
                    })
                }
            })
        }
    }

    resetSelectedProduct = () => {
        this.setState({
            dbId: "",
            id: "",
            description: "",
            datetime: "",
            longitude: "",
            latitude: "",
            elevation: "",
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="display1" gutterBottom>
                    Edit Product
                    <Divider/>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="dbId">Database Object Id</InputLabel>
                            <Select value={this.state.dbId} onChange={this.handleDbIdChange} inputProps={{name: 'dbId', id: 'dbId'}}>
                                {this.state.productData !== undefined && this.state.productData.map(n => {
                                    return(
                                        <MenuItem value={n.id}>{n.p_description}: Elevation: {n.elevation}, Latitude: {n.latitude}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </form>
                    <form className={classes.root} autoComplete="off" onSubmit={this.handleUpdate}>
                        <FormControl className={classes.formControl}>
                            <TextField value={this.state.id} onChange={this.handleChange('id')} type="number" className={classNames(classes.textField, classes.dense)} margin="dense" label="id"/>
                            <TextField value={this.state.description} onChange={this.handleChange('description')} multiline rowsMax="4" className={classNames(classes.textField, classes.dense)} margin="dense" label="description"/>
                            <TextField value={this.state.datetime} onChange={this.handleChange('datetime')} type="datetime-local" className={classes.textField} margin="normal" label="datetime" InputLabelProps={{shrink: true}}/>
                            <TextField value={this.state.longitude} onChange={this.handleChange('longitude')} type="number" multiline rowsMax="2" className={classNames(classes.textField, classes.dense)} margin="dense" label="longitude"/>
                            <TextField value={this.state.latitude} onChange={this.handleChange('latitude')} type="number" multiline rowsMax="2" className={classNames(classes.textField, classes.dense)} margin="dense" label="latitude"/>
                            <TextField value={this.state.elevation} onChange={this.handleChange('elevation')} type="number" multiline rowsMax="2" className={classNames(classes.textField, classes.dense)} margin="dense" label="elevation"/>
                            <Button variant="contained" color="primary" className={classes.button} type="submit">
                                Apply Changes
                                <TrackChangesIcon className={classes.rightIcon}/>
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button} type="button" onClick={this.handleDelete}>
                                <WarningIcon className={classes.leftIcon}/>
                                Delete
                            </Button>
                        </FormControl>
                    </form>
                </Typography>
                <div>{this.state.response}</div>
            </main>
        );
    }
}

export default (withStyles)(styles)(editProduct);