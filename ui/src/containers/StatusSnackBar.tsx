import * as React from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {WithStyles, withStyles} from '@material-ui/core/styles';
import * as notificationSelectors from '../store/notification/Reducer';
import * as notificationActions from '../store/notification/Actions';
import connect from 'react-redux/es/connect/connect';
import autoBind from 'react-autobind/src/autoBind';
import {ApplicationState} from '../store/Store';
import {blue} from '@material-ui/core/colors';


const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: blue[500],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


interface Props {
  isOpen: boolean,
  message: string,
  variant: string
}

interface DispatchProps {
  close()
}

type MergedProps = Props & DispatchProps & WithStyles<typeof styles> ;

class StatusSnackBar extends React.Component<MergedProps, any> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClose = () => {
    this.props.close();
  }

  static variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  render() {
    const {classes} = this.props;
    const Icon = StatusSnackBar.variantIcon[this.props.variant];
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.props.isOpen}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classNames(classes[this.props.variant])}
          aria-describedby='client-snackbar'
          message={
            <span id='client-snackbar' className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
              {this.props.message}
        </span>
          }
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon}/>
            </IconButton>,
          ]}
        />
      </Snackbar>

    );
  }
}

function mapStateToProps(state: ApplicationState): Props {
  return {
    message: notificationSelectors.message(state),
    isOpen: notificationSelectors.isOpen(state),
    variant: notificationSelectors.variant(state)
  }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {
    close: () => {
      dispatch(notificationActions.close())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusSnackBar));
