import { messagesActions, dialogType, messageType} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {appStateType} from "../../redux/redux-store";

type mapStatePropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    isAuth: boolean
}

type mapDispatchPropsType = {
    addMessage: (value: string) => void
}

type ownProps = {}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
        isAuth: state.auth.isAuth,
    };
};

export default compose(withAuthRedirect,
    connect<mapStatePropsType, mapDispatchPropsType, ownProps, appStateType>(mapStateToProps, {
        addMessage: messagesActions.addMessage
    })
)(Dialogs);
