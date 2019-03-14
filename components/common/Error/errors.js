import React from 'react';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/Error/error');
const getMessage = (statusCode) => {
    switch(statusCode) {
        case 404:
        return 'PAGE NOT FOUND';
        break;
        default:
    }
}
const ErrorsPart = ({statusCode}) => {
    return (
        <div className={`${styles['errors-main']}`}>
            <div className={`${styles['errors-main-inn']}`}>
                <div className={`${styles['erros-inn-img']}`}>
                    <img className={styles['']} src={"/static/img/errors-img/404tila.png"} />
                </div>
                {/* <div className={`${styles['errors-label']}`}>
                    <img className={styles['']} src={"/static/img/errors-img/404img.png"} />
                </div> */}
                <span className={styles['label-not']}>{statusCode}{getMessage(statusCode)}</span>
            </div>
        </div>
    );
}
export default ErrorsPart;