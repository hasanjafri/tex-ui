import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideNavBar from './components/SideNavBar';
import Routes from './components/routes';
import history from './components/history';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
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
  rightIcon: {
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      output_file_type: '',
      selected_lines: [],
    };
    this.fetchProducts();
  }
  

  fetchProducts = () => {
    fetch('http://127.0.0.1:8000/tex/').then(response => response.json()).then(json => {
      this.setState({
        productData: json
      })
    })
  }

  componentWillMount() {
    window.addEventListener('handleSensorChange', this._handleSensorChange);
  }

  componentWillUnmount() {
    window.removeEventListener('handleSensorChange', this._handleSensorChange);
  }

  _handleSensorChange = event => {
    this.setState({
      selected_lines: event.detail
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.state.productData);
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Router history={history}>
          <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
              <SideNavBar/>
              <Routes/>
            </div>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);