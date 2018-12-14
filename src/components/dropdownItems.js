import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 150,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

class DropdownItems extends React.Component {
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleMultipleChange = event => {
        this.setState({
            sensors: event.target.value
        }, () => {
            window.dispatchEvent(new CustomEvent('handleSensorChange', {
                detail: this.state.sensors
            }));
        });
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="product_desc">By Product Desc</InputLabel>
                <Select
                multiple
                value={this.props.selected_products}
                onChange={this.handleChange}
                inputProps={{
                    name: 'product_desc',
                    id: 'product_desc',
                }}
                input={<Input id="product_desc"/>}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                >
                    {this.props.product_descs}
                </Select>
            </FormControl>
        </form>
      )
    }
}

DropdownItems.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, {withTheme: true})(DropdownItems);