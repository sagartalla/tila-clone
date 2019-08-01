export const ORDER_ISSUE_TYPES = {
  CANCEL: 'CANCEL',
  RETURN: 'RETURN',
  EXCHANGE: 'EXCHANGE',
  DAMAGEWARRANTY:'DAMAGEWARRANTY',
  CLAIMWARRANTY:'CLAIMWARRANTY',
};

export const ORDER_ISSUE_STEPS = {
  LIST: 'LIST',
  REASONS: 'REASONS',
  CANCEL_COMPLETE: 'CANCEL_COMPLETE',
  CHOOSE_RETURN_EXCHANGE: 'CHOOSE_RETURN_EXCHANGE',
  [ORDER_ISSUE_TYPES.RETURN]: ORDER_ISSUE_TYPES.RETURN,
  [ORDER_ISSUE_TYPES.EXCHANGE]: ORDER_ISSUE_TYPES.EXCHANGE,
  [ORDER_ISSUE_TYPES.CANCEL]: ORDER_ISSUE_TYPES.CANCEL,
  CHOOSE_ADDRESS: 'CHOOSE_ADDRESS',
  RETURN_COMPLETE: 'RETURN_COMPLETE',
  CHOOSE_PAYMENT_MODE: 'CHOOSE_PAYMENT_MODE'
};
