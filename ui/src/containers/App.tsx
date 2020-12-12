import * as React from 'react'
import clsx from 'clsx';
import 'typeface-roboto'
import {Link as RouterLink, ReactRouterProps, Route} from "react-router-dom"
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import {withRouter} from "react-router"
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Theme, Tooltip} from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';
import OutlinePersonIcon from "@material-ui/icons/PersonOutline";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import * as authSelectors from '../store/auth/Reducer';
import * as authActions from "../store/auth/Actions";
import {blue} from "@material-ui/core/colors";
import AuthView from "./auth/AuthView";
import {mapRole, SystemRole} from "../store/users/Types";
import SettingsView from "./settings/SettingsView";
import ReleasesRouter from "./releases/ReleasesRouter";

// import MonitoringView from './monitoring/MonitoringView';
// import GroupRouter from "./group/GroupRouter";
// import UserRouter from "./users/UserRouter";
// import ProjectRouter from "./projects/ProjectRouter";
// import FlowRouter from "./processing/FlowRouter";
// import KafkaRouter from "../components/kafka/KafkaRouter";
// import TracingRouter from "../containers/tracing/TracingRouter";
// import SettingView from "./settings/SettingView";
// import IndexView from "./index/IndexView"
// import SolrIcon from '../components/index/SolrIcon';

const drawerWidth = 216
const drawerCloseWidth = 72
const topBarSize = 48

const styles = theme => ({

  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#c0c0c0',
      outline: '1px solid slategrey'
    },
  },

  root: {
    display: 'flex',
  },

  fixedBlocksWrapper: {
    position: "fixed" as any,
    top: 0,
    width: "100%",
    zIndex: 1000
  },
  headerWrapper: {
    position: "relative" as any,
    zIndex: 1000,
    top: 0,
    width: "100%",
    height: topBarSize,
  },

  toolbar: {
    minHeight: topBarSize,
    paddingRight: 24, // keep right padding when drawer closed
  },


  avatarWrapper: {
    width: theme.spacing(7) + 1,
    height: topBarSize,
    position: "relative" as any,
    '&::after': {
      'box-sizing': 'border-box',
      width: 1,
      left: theme.spacing(7) + 1,
      right: 0,
      position: "absolute" as any,
      content: "''",
      top: 14,
      bottom: 0,
      background: '#D3DAE6',
    }
  },
  breadcrumbBlock: {
    //position: "absolute" as any,
    top: 0,
    left: theme.spacing(7) + 1,
    right: 50,
    height: topBarSize,
    padding: 16
  },
  breadcrumbLink: {
    cursor: "pointer"
  },
  mainWindow: {
    zIndex: 5,
    position: "sticky" as any,
    right: 0,
    top: topBarSize,
   // left: theme.spacing(7) + 1,
    padding: 12
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  version: {
    position: "absolute" as any,
    bottom: 0,
    left: "47%"
  },

  userIconBlock: {
    position: "absolute" as any,
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    height: topBarSize,
    '&::after': {
      'box-sizing': 'border-box',
      width: 1,
      left: 0,
      position: 'absolute' as any,
      content: "''",
      top: 14,
      bottom: 0,
      background: '#D3DAE6',
    },
    '&:hover $userInfoBlock': {
      display: 'block'
    },
    '&:hover $userFillerBlock': {
      display: 'block'
    }
  },
  userIcon: {
    marginLeft: 10,
    marginTop: 10,
    width: 30,
    height: 30,
    color: blue[900],
    opacity: 0.7
  },
  userFillerBlock: {
    display: 'none',
    position: 'absolute' as any,
    width: 250,
    overflowX: 'hidden' as any,
    height: 4,
    top: topBarSize - 3,
    right: 0,
    zIndex: 1000,
    padding: 8
  },
  userInfoBlock: {
    display: 'none',
    position: 'absolute' as any,
    width: 250,
    overflowX: 'hidden' as any,
    top: topBarSize + 1,
    right: 0,
    padding: 8
  },
  avatar: {
    width: topBarSize + 6,
    height: topBarSize + 6,
    marginLeft: 2,
    position: "absolute" as any,
  },

  appBarSpacer: {
    minHeight: topBarSize
  },

  drawerOpen: {
    position: "fixed" as any,
    overflowX: 'hidden' as any,
    width: drawerWidth,
    boxShadow: '3px 0px 1px -2px rgba(0,0,0,0.2)',
    zIndex: 1000,
    top: topBarSize,
    bottom: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    position: "fixed" as any,
    zIndex: 1000,
    top: topBarSize,
    bottom: 0,
    boxShadow: '3px 0px 1px -2px rgba(0,0,0,0.2)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden' as any,
    width: 57,
    [theme.breakpoints.up('sm')]: {
      width: 57
    }
  },

  drawerPaper: {
    overflowX: 'hidden' as any,
    position: 'relative' as any,
    whiteSpace: 'nowrap' as any,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // backgroundColor: '#272838',
    // borderRightWidth: 0,

  },

  drawerPaperClose: {
    width: drawerCloseWidth,
    overflowX: 'hidden' as any,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // width: theme.spacing(7),
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9),
    // },
  },

  drawerList: {
    position: "absolute" as any,
    width: "100%",
    top: 0,
    bottom: 16
  },
  drawerHideList: {
    position: "absolute" as any,
    bottom: 0
  },

  arrowRightButton: {
    bottom: 5,
    position: "fixed" as any,
    marginRight: 0,
  },
  arrowRightButtonHidden: {
    display: 'none' as any,
  },

  arrowLeftButton: {
    bottom: 5,
    position: "fixed" as any,
    marginRight: 0,
  },
  arrowLeftButtonHidden: {
    display: 'none' as any,
  },

  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },

  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
    marginLeft: drawerCloseWidth,
    width: `calc(100% - ${drawerCloseWidth}px)`,
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


})

export const ERROR_500_MESSAGE = "Внутренняя ошибка сервиса. Обратитесь к администратору.";
export const ERROR_SOME_SERVICES_ARE_NOT_AVAILABLE = "Некоторые сервисы в данный момент недоступны.";

export const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const navMappings = {
  task: ['Задачи', null],
  releases: ['Релизы', null],
  settings: ['Настройки', null],
  users: ['Пользователи', null]
}

interface AppState {
  isOpened: boolean
}

interface AppProps {
  login: string,
  role: SystemRole,
  expTime: number,
  isAuthenticated: boolean,
  isAuthPerformed: boolean,
  checkAuth: boolean,
  logout(): any
}

class App extends React.Component<AppProps & ReactRouterProps, AppState> {

  menuItems = [
    {icon: <AssignmentTurnedInIcon/>, text: "Задачи", link: "/tasks"},
    {icon: <FavoriteIcon/>, text: "Релизы", link: "/releases"},
    {icon: <SettingsApplicationsIcon/>, text: "Настройки", link: "/settings"}
  ];

  intervalID;

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isOpened: false
    }
  }

  componentDidMount(): void {
    this.intervalID = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= this.props.expTime) {
        this.props.logout();
      }
    }, 1000);
  }

  renderMenuList (menuList: any[]) {
    return (
        menuList.map(element => {
            return <ListItem
                style={{paddingLeft: 24}}
                button
                key={element.text}
                component={RouterLink} {...{to: element.link} as any}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.text}/>
            </ListItem>
    })
    )
  }

  render() {

    console.log(JSON.stringify(this.props, null,2))

    if (!this.props.isAuthenticated) {
      return this.renderAuthView()
    }
    else
      return this.renderMainView()
  }

  renderLoader() {
    return (
      <Grid container style={{width: "100%", marginTop: 32, paddingBottom: 32}} justify="center" alignItems="center">
        <Grid item>
          <CircularProgress disableShrink/>
        </Grid>
      </Grid>
    )
  }

  renderMainView() {
    const {classes, location} = this.props;
    const pathnames = location.pathname.split('/').filter(x => x);

    const handleDrawerOpen = () => {
      this.setState({isOpened: true})
    };
    const handleDrawerClose = () => {
      this.setState({isOpened: false})
    };

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="absolute" className={clsx(classes.appBar, this.state.isOpened && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            {location && <div className={classes.breadcrumbBlock}>
              <Breadcrumbs>
                {pathnames.map((path, index) => {
                  const last = index == pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`
                  const marker = navMappings[path] && navMappings[path][0] ? navMappings[path][0] : path
                  const redirect = navMappings[path] && navMappings[path][1] !== null ? navMappings[path][1] : to
                  return last ? (
                    <Typography>
                      {marker}
                    </Typography>
                  ) : (
                    <Link color="inherit" className={classes.breadcrumbLink} component={RouterLink} to={redirect}>
                      {marker}
                    </Link>
                  )
                })}
              </Breadcrumbs>
            </div>}
            <div className={classes.userIconBlock}>
              <OutlinePersonIcon className={classes.userIcon}/>
              <div className={classes.userFillerBlock}/>
              <Box boxShadow={1} bgcolor={"white"} className={classes.userInfoBlock}>
                <Typography variant="subtitle1" color={"primary"}>
                  {this.getName()}
                </Typography>
                <Typography variant="body" color={"primary"}>
                  {mapRole[this.props.role]}
                </Typography>
                <Divider/>
                <Button
                  variant="outlined"
                  onClick={() => this.props.logout()}
                  style={{width: "100%", marginTop: 8}}
                  color="primary">
                  Выйти
                </Button>
              </Box>
            </div>
            </Toolbar>
          </AppBar>
        <ClickAwayListener onClickAway={() => {
        }}>
          <Drawer
              variant="permanent"
              classes={{
                paper: clsx(classes.drawerPaper, !this.state.isOpened && classes.drawerPaperClose),
              }}
              open={this.state.isOpened}
          >
            <div>
              <ListItem  style={{paddingBottom: 10 , paddingTop: 13, paddingLeft: 16, background: blue[900]}} >
                <ListItemIcon>
                  <MenuIcon style={{color: "white"}}/>
                </ListItemIcon>
              </ListItem>
            </div>
            <List>{this.renderMenuList(this.menuItems)} </List>
            <div className={classes.toolbarIcon}>
              <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.arrowRightButton, this.state.isOpened && classes.arrowRightButtonHidden)}
              >
                <ChevronRightIcon/>
              </IconButton>
              <IconButton
                  onClick={handleDrawerClose}
                  className={clsx(classes.arrowLeftButton, !this.state.isOpened && classes.arrowLeftButtonHidden)}
              >
                <ChevronLeftIcon/>
              </IconButton>
            </div>

          </Drawer>
        </ClickAwayListener>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <div className={classes.mainWindow}>
            {/*<Route path="/tasks" component={TaskRouter}/>*/}
            <Route path="/releases" component={ReleasesRouter}/>
            <Route path="/settings" component={SettingsView}/>
            <Route path="/users" exact={true} render={() => <SettingsView currentTab={1}/>}/>
          </div>
        </main>
        </div>
      </React.Fragment>
    )
  }

  renderAuthView() {
    return <AuthView/>
  }

  getName() {
    let val = this.props.login;
    if (val.length > 10) {
      val = val.substr(0, 10) + "..."
    }
    return val
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: authSelectors.isAuthenticated(state),
    isAuthPerformed: authSelectors.isAuthPerformed(state),
    login: authSelectors.username(state),
    checkAuth: authSelectors.checkAuth(state),
    role: authSelectors.getRole(state),
    expTime: authSelectors.getExpTime(state)
  }
}

function mapDispatchProps(dispatch: any) {
  return {
    logout(): any {
      dispatch(authActions.logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(withStyles(styles)(App)));
