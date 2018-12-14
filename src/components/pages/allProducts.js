import React from 'react';
import DropdownItems from '../dropdownItems';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import SimpleScatterChart from '../simpleScatterChart';
import SimpleTable from '../simpleTable';
import Scatter from 'recharts/lib/cartesian/Scatter';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox, ListItemText } from '@material-ui/core';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

const tableStyle = {
	tableColWidth: 4261, // Width of each column
	tableSize: 24, // Table size
	tableColor: 'red', // Content color
	tableAlign: 'center', // Align content
	borders: true, // Borders
};

const HEADERS = [
    {
      value: 'Phone',
      styles: {
        color: 'red',
        bold: true,
        size: 10
      }
    },
    {
      value: 'Capacity',
      styles: {
        color: 'blue',
        bold: true,
        size: 10
      }
    }
  ]

class allProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: this.fetchProducts(),
            product_descs: [],
            selected_products: []
        }
    }

    fetchProducts = () => {
        fetch('http://127.0.0.1:8000/tex/').then(response => response.json()).then(json => {
          this.setState({
            productData: json
          })
        })
    }

    groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    generateScatterChartData = () => {
        let productData = this.state.productData;
        let scatters = [];
        for (let i = 0; i < productData.length; i++) {
            productData[i].longitude = parseFloat(productData[i].longitude);
            productData[i].latitude = parseFloat(productData[i].latitude);
        }
        let groupedData = this.groupBy(productData, product => product.p_id);
        groupedData.forEach(function(n, i) {
            scatters.push(
                <Scatter key={i} name={n[0].p_description} data={n} fill="#8884d8" shape="star"/>
            )
        })

        return scatters;
    }

    handleDownload = () => {
        let newTab = window.open('http://127.0.0.1:8000/docx/')
        newTab.focus();
    }

    generateFiltrationData = () => {
        const app = this;
        let productData = this.state.productData;
        let menuItems = [];
        for (let i = 0; i < productData.length; i++) {
            productData[i].longitude = parseFloat(productData[i].longitude);
            productData[i].latitude = parseFloat(productData[i].latitude);
        }
        let groupedData = this.groupBy(productData, product => product.p_id);
        groupedData.forEach(function(n, i) {
            menuItems.push(
                <MenuItem key={i} value={n[0].p_description}>
                    <Checkbox checked={app.state.selected_products.indexOf(n[0].p_description) > -1}/>
                    <ListItemText primary={n[0].p_description}/>
                </MenuItem>
            )
        })

        return menuItems;
    }

    render() {
        const { classes } = this.props;
        return(
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="display1" gutterBottom>
                    Filter Chart
                    <Divider hidden/>
                    <DropdownItems product_descs={this.state.productData ? this.generateFiltrationData() : []} selected_products={this.state.selected_products}/>
                </Typography>
                <Divider hidden/>
                <Typography component="div" className={classes.chartContainer}>
                    <SimpleScatterChart data={this.state.productData ? this.generateScatterChartData() : null}/>
                </Typography>
                <div style={{float: "right", padding: '20 20 20 20'}}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleDownload}>
                        <DownloadIcon className={classes.rightIcon}/>
                        DOWNLOAD
                    </Button>
                </div>
                <Typography variant="h4" gutterBottom component="h2">
                    Products
                </Typography>
                <Divider hidden/>
                <div className={classes.tableContainer}>
                    <SimpleTable productData={this.state.productData ? this.state.productData : []}/>
                </div>
            </main>
        );
    }
}

export default (withStyles)(styles)(allProducts);