import {Notyf} from 'notyf'

export enum SccMsg {
    LOGIN_SUCCESSFULLY = 'Logged in successfully',
    LOGOUT_SUCCESSFULLY = 'Logged out successfully',
    REGISTER_SUCCESSFULLY = 'Registered successfully',
    EXECUTED_SUCCESSFULLY = 'Executed successfully',
    LOGIN_REQUIRED = 'Please Login first',
}


export enum ErrMsg {
    LOGIN_FAILED = 'Login Failed',
    FAILED_TO_EXECUTE = 'Failed to execute',
    LOGIN_REQUIRED = 'Login required',
    UNAUTHORIZED = '401 - Unauthorized',
    FAILED_TO_LOAD_DATA = 'Failed to load data',
}

class Notify {

    private notification = new Notyf({duration:4000, position:{x:"left",y:"top"}});

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any): string {
		if(typeof err === 'string'){
            return err;
        }
        if(typeof err?.response?.data === 'string') { //Backend exact error
            return err.response.data;
        }
        if(Array.isArray(err?.response?.data)) { // Backend exact error list
            return err?.response?.data[0];
        }
		// Must be last
        if(typeof err?.message === 'string'){
            return err.message;
        }
        return "An error occurred, please try again.";
    }
}

const notify = new Notify();

export default notify;