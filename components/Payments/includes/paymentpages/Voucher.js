import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

const Voucher = props => {
  const { voucherData, isOnlyVocuher } = props;
  const { balance, amount_to_pay, currency_code, remaining_amount } = voucherData;
  return (
    <div className={`${styles['voucher']} ${styles['p-10']}`}>
      <Grid>
        <Row>
          <div>
            <div>Tila Credit Used</div>
            {
              isOnlyVocuher
                ?
                  <div>All other payment methods have been disabled as you have enough tila credit in your Wallet to purchace this item. Enjoy your purchase :)</div>
                :
                  null
            }
            <div>
              <div>
                <div>Money in Wallet</div>
                <div>{balance} {currency_code}</div>
              </div>
              <div>
                <span>-</span>
              </div>
              <div>
                <div>Total Amount To Pay</div>
                <div>{amount_to_pay} {currency_code}</div>
              </div>
              <div>
                <span>=</span>
              </div>
              <div>
                <div>Remaining amount to pay</div>
                <div>{remaining_amount} {currency_code}</div>
              </div>
            </div>
            {
              isOnlyVocuher
                ?
                  <div>
                    <button className={`${styles['fp-btn-primary']} ${styles['fp-btn']}`}>PAY USING TILA CREDIT</button>
                  </div>
                :
                 null
            }

          </div>
        </Row>
      </Grid>
    </div>
  )
};

Voucher.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

Voucher.defaultProps = {

}

export default Voucher;
